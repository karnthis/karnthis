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

//* load page

onload = () => {
	const master = {};
	let test = "clickGame"
	master[test] = new Clicker();
	console.log(master);
	master.clickGame.showPoints();
	
  document.getElementById("gamespace").addEventListener("click", function(e) {
		if (e.srcElement.className == "addauto") {
			let newEl = document.createElement("button").appendChild(document.createTextNode("New Autoclicker")).getRootNode();
			newEl.id = Date.now();
			newEl.className = "autoclick";
			document.getElementById("special").appendChild(newEl);
		}

		// console.log(e.srcElement);
    if (e.srcElement.id == "clicker") {
			// console.log("clicked");
      master.clickGame.clickedEarn();
    }
    if (e.srcElement.className == "autoclick") {
			console.log(e.srcElement.id);
      master.clickGame.rank1();
    }
  });
};
