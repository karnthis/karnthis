class AutoClicker {
  constructor(mod) {
    this.price = Math.ceil(20 * mod.price);
		this.payout = Math.floor(1 * mod.payout);
		this.time = Math.ceil(1 * mod.time) * 1000;
		this.count = 0;
		this.running = false;
		this.points = document.getElementById("points").firstChild;
  }

  static updateRates() {
    if (!AutoClicker.modifiers) {
			AutoClicker.modifiers = {};
			AutoClicker.modifiers.price = 1;
			AutoClicker.modifiers.payout = 1;
			AutoClicker.modifiers.time = 1;
		}
		else {
      AutoClicker.modifiers.price *= 1.6;
			AutoClicker.modifiers.payout *= 2.2;
			AutoClicker.modifiers.time *= 1.5;
    }
	}
	
	buyClicker() {
		let workingPoints = parseInt(this.points.nodeValue);
		console.log("avail:", workingPoints)
		console.log("cost:", this.price)
		console.log("pays:", this.payout)
		if (workingPoints >= this.price) {
			this.points.nodeValue = workingPoints - this.price;
			this.count++;
			this.price = Math.ceil(this.price *1.25);
			if (!this.running) {
				this.running = true;
        let self = this;
        setInterval(function() {
          self.points.nodeValue = parseInt(self.points.nodeValue) + (self.payout * self.count);
        }, self.time);
      }
		}
	}

	buyClickers() {
		let workingPoints = parseInt(this.points.nodeValue);
		let workingCost = Math.ceil(this.price * (1 + .25) ** 10);
		console.log("avail:", workingPoints)
		console.log("cost:", workingCost)
		console.log("pays:", this.payout)
		if (workingPoints >= workingCost) {
			this.points.nodeValue = workingPoints - workingCost;
			this.count += 10;
			this.price = Math.ceil(this.price * (1 + .25) ** 11);			
		}
	}

	//TODO finish this, find some math >_<

	buyMaxClickers() {
		let workingPoints = parseInt(this.points.nodeValue);
		let workingCost = Math.ceil(this.price * (1 + .25) ** 10);
		console.log("avail:", workingPoints)
		console.log("cost:", workingCost)
		console.log("pays:", this.payout)
		if (workingPoints >= workingCost) {
			this.points.nodeValue = workingPoints - workingCost;
			this.count += 10;
			this.price = Math.ceil(this.price * (1 + .25) ** 11);
		}
	}
}


const buildEl = (bit1, bit2) => {
  let working = document
    .createElement("div")
    .appendChild(document.createTextNode(bit2))
    .getRootNode();
  working.className = bit1;
  return working;
};

//* load page

onload = () => {
  const master = {};
	AutoClicker.updateRates();

  document.getElementById("gamespace").addEventListener("click", function(e) {
    //* set up working vars
    let workingid = e.srcElement.parentElement.id;
    let clickedclass = e.srcElement.className;

    if (clickedclass == "addauto") {
      let d = document;
      let newEl = document
        .createElement("div")
        .appendChild(buildEl("meh", "testing"))
        .getRootNode()
        .appendChild(buildEl("bah buyClicker", "buy 1 clicker"))
        .getRootNode()
        .appendChild(buildEl("bah buy10Clickers", "buy 10 clickers"))
        .getRootNode()
        .appendChild(buildEl("bah buyMaxClickers", "disabled"))
				.getRootNode();
				
      newEl.id = Date.now();
      newEl.className = "child";
      document.getElementById("gamespace").appendChild(newEl);

			master[newEl.id] = new AutoClicker(AutoClicker.modifiers);
			AutoClicker.updateRates();
    }

    if (clickedclass == "clicker") {
			let pointnode = document.getElementById("points").firstChild;
			pointnode.nodeValue = parseInt(pointnode.nodeValue) + 1;
    }
    
		if (clickedclass.indexOf("buyClicker") >= 0) {
      master[workingid].buyClicker();
		}
		if (clickedclass.indexOf("buy10Clickers") >= 0) {
      master[workingid].buyClickers();
		}
  });
};
