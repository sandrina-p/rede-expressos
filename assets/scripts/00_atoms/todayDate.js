var today;

$(function todayDate() {
    // CODE FROM: http://stackoverflow.com/a/4929629/4737729
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    today = dd+'-'+mm+'-'+yyyy;

    return today;
});
