import { db } from "./firebase.js"
import { ref, get } from "firebase/database"
import { useList } from "react-firebase-hooks/database"
class Model {
    constructor() {
        this.boxOpen = false;
        this.bookedDate = Date.parse(new Date(2022, 3, 19, 0, 41, 0));
        this.returnDate = Date.parse(new Date(2022, 3, 20, 1, 38, 0));
        this.observers = [];
        this.timeUntilAccess = null;
        this.timeUntilReturn = null;
        this.distance = null;
        this.keyTaken = false;
        this.targetLocation = { lng: 17.948411885183468, lat: 59.40462693468842 }
        this.setTimeUntilAccess();
        this.getDistanceToTarget();
        console.log(this.distance)
    }

    firebaseTest(){
        console.log(useList(ref(db, `keyboxes/dkgC3kfhLpkKBysY_C-9/bookings`)))
    }

    getDistanceToTarget() {
        navigator.geolocation.watchPosition((pos) => this.setDistanceToTarget(pos));
    }
    setDistanceToTarget(pos) {
        var crd = pos.coords;
        this.distance = Math.round(distance(crd.latitude, crd.longitude, this.targetLocation.lat, this.targetLocation.lng) * 1000)
        this.notifyObservers();
    }

    changeStateOfBox() {
        this.boxOpen = !this.boxOpen;
        console.log(this.boxOpen)
        this.notifyObservers();
    }

    getTimeUntilAccess() {
        let difference = this.bookedDate - Date.now();
        let timeLeft = {};
        if(difference > -7000){
            this.timeUntilAccess = difference;
            this.notifyObservers();
        }
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return timeLeft;
    }
    setTimeUntilAccess() {
        this.timeUntilAccess = this.bookedDate - Date.now();
        this.notifyObservers();
    }

    getTimeUntilReturn() {
        let difference = this.returnDate - Date.now();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
            };
        }
        return timeLeft;
    }

    setTimeUntilReturn() {
        this.timeUntilReturn = this.returnDate - Date.now();
        this.notifyObservers();
    }

    changeStateOfKey() {
        this.keyTaken = !this.keyTaken;
        this.notifyObservers();
    }

    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }
    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs !== callback);
    }
    notifyObservers() {
        this.observers.forEach(cb => {
            try { cb() } catch (e) { console.log(e) }
        });
    }
}

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distance(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}

export default Model;