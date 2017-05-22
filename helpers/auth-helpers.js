module.exports = {
  setCurrentUser: function(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.currentUser = req.user;
      res.locals.isUserLoggedIn = true;

    } else {
      res.locals.isUserLoggedIn = false;
    }
    next();
  },
  checkRoles: (role, redirectPath = "/") => {
    return (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === role) {
        return next();
      } else {
        res.redirect(redirectPath);
      }
    };
  },
  ensureLoggedIn: (redirectPath) => {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        next();
      } else {
        res.redirect(redirectPath);
      }
    };
  },
  ifAlreadyLoggedIn: (redirectPath) => {
    return (req, res, next) => {
      if (req.isAuthenticated()) {
        res.redirect(redirectPath);
      } else {
        next();
      }
    };
  },
  getDistance:function(lat1, lon1, lat2, lon2) {
  // haversine formular, to measure distance between two points on earth
       Number.prototype.toRad = function() {
          return this * Math.PI / 180;
       };

       var R = 6371; // earth radius in KM
       var x1 = lat2-lat1;
       var dLat = x1.toRad();
       var x2 = lon2-lon1;
       var dLon = x2.toRad();
       var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                       Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                       Math.sin(dLon/2) * Math.sin(dLon/2);
       var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
       var d = R * c;
       console.log(d);
       return d*1000; // distance in KM
  }
};
