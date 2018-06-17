class Clicker {
  constructor(pt, cw, r1p, r1c) {
    //* setup values
    this.pointTotal = pt || 0;
    this.clickWorth = cw || 1;
    this.rank1Points = r1p || 0;

    //* setup costs

    this.rank1Cost = r1c || 10;
  }
  //* load user data

  showPoints() {
    document.getElementById("points").innerText = this.pointTotal;
    switch (true) {
      case this.pointTotal > 10:
        //TODO reveal things
        break;
    }
  }

  getPoints(x) {
    this.pointTotal += x;
    this.showPoints();
  }

  clickedEarn() {
    this.getPoints(this.clickWorth);
  }

  //* autoclickers

  rank1() {
    if (this.pointTotal >= this.rank1Cost) {
      this.rank1Points++;
      this.pointTotal -= this.rank1Cost;
      this.showPoints();
      this.rank1Cost = Math.ceil(this.rank1Cost * 1.1);
      if (this.rank1Points == 1) {
        let self = this;
        setInterval(function() {
          self.rank1Wrapper();
        }, 5000);
      }
    }
  }

  rank1Wrapper() {
    this.getPoints(this.rank1Points);
  }
}

class AutoClicker {
  constructor(mod) {
    this.price = Math.ceil(25 * mod.price);
		this.payout = Math.floor(1 * mod.payout);
		this.time = Math.ceil(2 * mod.time) * 1000;
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
      AutoClicker.modifiers.price *= 3.1;
			AutoClicker.modifiers.payout *= 2.5;
			AutoClicker.modifiers.time *= 2.5;
    }
	}
	
	buyClicker() {
		console.log('first hit')
		let workingPoints = parseInt(this.points.nodeValue);
		console.log(workingPoints)
		console.log(this.price)
		console.log(this.payout)
		if (workingPoints >= this.price) {
			this.points.nodeValue = workingPoints - this.price;
			this.count++;
			this.price = Math.ceil(this.price *1.25);
			console.log('second hit')
			if (!this.running) {
				this.running = true;
				console.log('loop hit')
        let self = this;
        setInterval(function() {
          self.points.nodeValue = parseInt(self.points.nodeValue) + (self.payout * self.count);
        }, self.time);
      }
		}
	}

	buyClickers() {
		console.log('first hit')
		let workingPoints = parseInt(this.points.nodeValue);
		let workingCost = Math.ceil(this.price * (1 + .25) ** 10);
		console.log(workingPoints)
		console.log(workingCost)
		console.log(this.payout)
		if (workingPoints >= workingCost) {
			this.points.nodeValue = workingPoints - workingCost;
			this.count += 10;
			this.price = Math.ceil(this.price * (1 + .25) ** 11);
			// console.log('second hit')
			
		}
	}

	buyMaxClickers() {
		console.log('first hit')
		let workingPoints = parseInt(this.points.nodeValue);
		let workingCost = Math.ceil(this.price * (1 + .25) ** 10);
		console.log(workingPoints)
		console.log(workingCost)
		console.log(this.payout)
		if (workingPoints >= workingCost) {
			this.points.nodeValue = workingPoints - workingCost;
			this.count += 10;
			this.price = Math.ceil(this.price * (1 + .25) ** 11);
			// console.log('second hit')
			
		}
	}


}

// class Tester {
//   constructor(prop1) {
//     this.prop1 = prop1;
//   }

//   update() {
//     this.prop1++;
//     this.prop2++;
//   }
//   check() {
//     console.log("prop1:", this.prop1);
//     console.log("prop2:", this.prop2);
//   }
// }

const testfunc = (bit1, bit2) => {
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
  // console.log(testfunc("meh", "testing"));
  // console.log(typeof testfunc("meh", "testing"));

  document.getElementById("gamespace").addEventListener("click", function(e) {
    //* set up working vars
    let workingid = e.srcElement.parentElement.id;
    let clickedclass = e.srcElement.className;

    if (clickedclass == "addauto") {
      let d = document;
      let newEl = document
        .createElement("div")
        .appendChild(testfunc("meh", "testing"))
        .getRootNode()
        .appendChild(testfunc("bah buyClicker", "buy 1 clicker"))
        .getRootNode()
        .appendChild(testfunc("bah buy10Clickers", "buy 10 clickers"))
        .getRootNode()
        .appendChild(testfunc("bah buyMaxClickers", "disabled"))
        .getRootNode();

      // let newEl = document.createElement("button").appendChild(document.createTextNode("New Autoclicker")).getRootNode();
      newEl.id = Date.now();
      newEl.className = "child";
      document.getElementById("gamespace").appendChild(newEl);

			master[newEl.id] = new AutoClicker(AutoClicker.modifiers);
			AutoClicker.updateRates();
    }

    // if (clickedclass == "test") {
    //   Tester.prototype.prop2 = 1;
    //   console.log(Tester);
    // }
    // if (clickedclass == "test2") {
    //   Tester.prototype.prop2++;
    // }

    // console.log(e.srcElement);
    // if (eh == "clicker") {
    // 	// console.log("clicked");
    //   master.clickGame.clickedEarn();
    // }
    
		if (clickedclass.indexOf("buyClicker") >= 0) {
			console.log("clicker");
      master[workingid].buyClicker();
		}
		if (clickedclass.indexOf("buy10Clickers") >= 0) {
      console.log("clicker 10");
      master[workingid].buyClickers();
		}
    // console.log(e.srcElement.parentElement.id);
    // console.log(e.srcElement.className);
  });
};
