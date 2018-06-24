class ClickerFunctions {

	// constructor(resume) {
	// 	if (!resume) resume = {};
	// 	super();
	// 	this.emojis = resume.emojis || [];
  //   this.currentPoints = resume || 0;
  //   this.totalPoints = resume || 0;
  //   this.totalClicks = resume || 0;
  // }

  //* shared functions
  updateScore(moarPoints) {
		this.currentPoints += moarPoints;
		this.totalPoints =+ moarPoints;
		// console.log(this)
		document.getElementById("points").firstChild.nodeValue = this.currentPoints;
  }
}

class SelfClicker extends ClickerFunctions {
  constructor(resume) {
		super();
		if (!resume) resume = {};
		if (!resume.modifiers) resume.modifiers = {};
		this.modifiers = {};
		this.emojis = resume.emojis || [];
    this.currentPoints = resume.currentPoints || 0;
    this.totalPoints = resume.totalPoints || 0;
		this.totalClicks = resume.totalClicks || 0;
		this.modifiers.autoPrice = resume.modifiers.autoPrice || 1;
		this.modifiers.autoPayout = resume.modifiers.autoPayout || 1;
		this.modifiers.autoTime = resume.modifiers.autoTime || 1;
	}
	
	// static setRates(startMods) {
  //   if (!startMods) {
      
  //     this.autoPrice = 1;
  //     this.autoPayout = 1;
  //     this.autoTime = 1;
  //   } else {
  //     AutoClicker.modifiers = startMods;
  //   }
  // }

  updateRates() {
    this.modifiers.autoPrice *= 1.6;
    this.modifiers.autoPayout *= 2.2;
    this.modifiers.autoTime *= 1.5;
  }
}

class AutoClicker extends ClickerFunctions {
  constructor(mod, resume) {
    if (!resume) resume = {};
    super();
    this.price = resume.price || Math.ceil(20 * mod.autoPrice);
    this.payout = resume.payout || Math.floor(1 * mod.autoPayout);
    this.time = resume.time || Math.ceil(1 * mod.autoTime) * 1000;
    this.count = resume.count || 0;
		this.running = resume.running || false;
		this.emoji = resume.emoji || "";
    // this.points = document.getElementById("points").firstChild;
  }

  // static setRates(startMods) {
  //   if (!startMods) {
  //     AutoClicker.modifiers = {};
  //     AutoClicker.modifiers.price = 1;
  //     AutoClicker.modifiers.payout = 1;
  //     AutoClicker.modifiers.time = 1;
  //   } else {
  //     AutoClicker.modifiers = startMods;
  //   }
  // }

  // static updateRates() {
  //   AutoClicker.modifiers.price *= 1.6;
  //   AutoClicker.modifiers.payout *= 2.2;
  //   AutoClicker.modifiers.time *= 1.5;
  // }

  startClicker() {
    let self = this;
    self.running = true;
    setInterval(function() {
      self.points.nodeValue =
        parseInt(self.points.nodeValue) + self.payout * self.count;
    }, self.time);
  }

  buyClicker() {
    let workingPoints = parseInt(this.points.nodeValue);
    console.log("avail:", workingPoints);
    console.log("cost:", this.price);
    console.log("pays:", this.payout);
    if (workingPoints >= this.price) {
      this.points.nodeValue = workingPoints - this.price;
      this.count++;
      this.price = Math.ceil(this.price * 1.25);
      if (!this.running) {
        this.startClicker();
      }
    }
  }

  buyClickers() {
    let workingPoints = parseInt(this.points.nodeValue);
    let workingCost = Math.ceil(this.price * (1 + 0.25) ** 10);
    console.log("avail:", workingPoints);
    console.log("cost:", workingCost);
    console.log("pays:", this.payout);
    if (workingPoints >= workingCost) {
      this.points.nodeValue = workingPoints - workingCost;
      this.count += 10;
      this.price = Math.ceil(this.price * (1 + 0.25) ** 11);
      if (!this.running) {
        this.startClicker();
      }
    }
  }

  //TODO finish this, find some math >_<

  buyMaxClickers() {
    let workingPoints = parseInt(this.points.nodeValue);
    let workingCost = Math.ceil(this.price * (1 + 0.25) ** 10);
    console.log("avail:", workingPoints);
    console.log("cost:", workingCost);
    console.log("pays:", this.payout);
    if (workingPoints >= workingCost) {
      this.points.nodeValue = workingPoints - workingCost;
      this.count += 10;
      this.price = Math.ceil(this.price * (1 + 0.25) ** 11);
      if (!this.running) {
        this.startClicker();
      }
    }
  }
}

//* load page

onload = () => {
  // console.log("width",window.innerWidth)
  // console.log("height",window.innerHeight)
  const rebuild = JSON.parse(localStorage.getItem("clickers")) || {};
  // AutoClicker.setRates();
  //document.getElementById('temp').innerHTML = localStorage.getItem("clickers");
  //* build playing field
  const master = populateField(rebuild);
	if (!master.test) {
		master.test = new SelfClicker();
	}
	// master.test = new SelfClicker();
	// console.log(master.tracker);

  //* autosave
  // setInterval(function() {
  // 	localStorage.setItem("clickers", master)
  // }, 5000);

  document.getElementById("gamespace").addEventListener("click", function(e) {
    //* set up working vars
    let workingid = e.target.parentElement.id;
    let clickedclass = e.target.className;

		if (clickedclass == "clicker") {
			master.test.updateScore(1);
      // let pointnode = document.getElementById("points").firstChild;
      // pointnode.nodeValue = parseInt(pointnode.nodeValue) + 1;
    }

    if (clickedclass == "addauto") {
      let id = Date.now();
      document.getElementById("gamespace").appendChild(buildClicker(id));
      console.log(id);
      master[id] = new AutoClicker(master.test.modifiers);
      master.test.updateRates();
			// console.log(master);
			master[id].emoji = getEmoji(master.test.emojis)
			// console.log(master[id].emoji);
			master.test.emojis.push(master[id].emoji);
			document.getElementById(id).children[0].innerHTML = master[id].emoji;
    }

    

    if (clickedclass.indexOf("buyClicker") >= 0) {
      console.log(workingid);
      master[workingid].buyClicker();
    }
    if (clickedclass.indexOf("buy10Clickers") >= 0) {
      master[workingid].buyClickers();
    }
    if (clickedclass.indexOf("test") >= 0) {
      saveData(master);
    }
  });
};

//* functions

const saveData = (data) => {
  localStorage.setItem("clickers", JSON.stringify(data));
};

const buildChild = (bit1, bit2) => {
  let working = document
    .createElement("div")
    .appendChild(document.createTextNode(bit2))
    .getRootNode();
  working.className = bit1;
  return working;
};

const buildClicker = (elId) => {
  let newEl = document
    .createElement("div")
    .appendChild(buildChild("title", ""))
    .getRootNode()
    .appendChild(buildChild("buy buyClicker", "buy 1 clicker"))
    .getRootNode()
    .appendChild(buildChild("buy buy10Clickers", "buy 10 clickers"))
    .getRootNode()
    .appendChild(buildChild("buy buyMaxClickers", "disabled"))
    .getRootNode();
  newEl.id = elId;
  newEl.className = "autoClicker";
  return newEl;
};

const populateField = (allClickers) => {
	let masterRef = {};
  Object.keys(allClickers).forEach(key => {
		if (key == "tracker") {
			masterRef.tracker = new Clickers(allClickers[key]);
		}
		else if (key == "test") {
			console.log(allClickers[key]);
			masterRef.test = new SelfClicker(allClickers[key]);
		}
		else {
			// console.log(allClickers);
			// console.log(allClickers[key]);
			document.getElementById("gamespace").appendChild(buildClicker(key));
			document.getElementById(key).children[0].innerHTML = allClickers[key].emoji;
			masterRef[key] = new AutoClicker(allClickers.test.modifiers, allClickers[key]);
		}    
	});
	// console.log(masterRef);
	return masterRef;
};

const getEmoji = (arr) => {
	while (true) {
		let bits1 = "0123456789";
		let bits2 = "0123456789ABCDEF";
		let bit1 = bits1.charAt(Math.floor(Math.random() * bits1.length));
		let bit2 = bits2.charAt(Math.floor(Math.random() * bits2.length));
		let emoji = `&#x1F6${bit1}${bit2}`
		if (arr.indexOf(emoji) < 0) {
			return emoji;
		}
	}
}