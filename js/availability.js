function cell(day) {
    if (!day.day) {
        return "";
    }

    var today = new Date();
    var calendarDay = new Date(window.year, window.month, day.day);

    var background;

    if (calendarDay <= today) {
        background = "<div  style='border-radius: 50%; background: #EC7063; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; margin: 5px'>"
    } else if (day.four > 0) {
        background = "<div  style='border-radius: 50%; background: #82E0AA; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; margin: 5px'>"
    } else {
        background = "<div  style='border-radius: 50%; background: #EC7063; width: 20px; height: 20px; display: flex; justify-content: center; align-items: center; margin: 5px'>"
    }

    return background + '<div style="cursor: pointer" id="' + window.year + window.month + day.day + '">' + day.day + '</div>';
}

function makeTable(container, data) {
    container.empty();
    $.each(data, function (rowIndex, r) {
        var row = "<tr>";
        $.each(r, function (colIndex, c) {
            row += "<td align='center'>"
                + cell(c)
                + "</div>"
                + "</td>";
        });
        row += "</tr>";
        container.html(container.html() + row);
    });

    $.each(data, function (rowIndex, r) {
        $.each(r, function (colIndex, c) {
            $("#" + window.year + window.month + c.day).click(function () {
                $("#calendarDelails").show();
                $("#dayOfMonth").text(c.day);

                var today = new Date();
                var calendarDay = new Date(window.year, window.month, c.day);

                if (calendarDay <= today) {
                    $("#progressBar").css("width", 0);
                    $("#places").text("0 OF 500 PLACES");
                } else {
                    $("#progressBar").css("width", (c.four / 5) + "%");
                    $("#places").text(c.four + " OF 500 PLACES");
                }
            });
        });
    });

    var today = new Date();
    $("#" + today.getFullYear() + today.getMonth() + today.getDate()).click();
}

function getAvailabilityData(year, month) {
    var clone = jQuery.extend(true, {}, window.fetchResult);
    var availability = clone.availabilities.find(function (availability) {
        return (availability.year === year) && (availability.month === (month + 1))
    });

    if (!availability) {
        return;
    }

    window.year = year;
    window.month = month;

    var dayOfWeek = moment(new Date(year, month, 1)).day();
    $("#month").html(moment(new Date(year, month, 1)).format("MMMM") + " " + year);

    availability.dayAvailabilities
        .sort(function(a, b) {
            return a.day - b.day;
        })
        .reverse();
    for (var i = 0; i < dayOfWeek; i++) {
        availability.dayAvailabilities.push({});
    }
    availability.dayAvailabilities.reverse();

    var availabilityData = availability.dayAvailabilities
        .reduce(function (week, day, index) {
            if (index % 7 === 0) {
                week.push([]);
            }
            week[week.length - 1].push(day);
            return week;
        }, []);

    makeTable($("#availability"), availabilityData, year, month);
}

function nextMonth() {
    var year, month;
    if (window.month === 11) {
        year = window.year + 1;
        month = 0;
    } else {
        year = window.year;
        month = window.month + 1;
    }
    loadAvailability(year, month);
}

function previousMonth() {
    var year, month;
    if (window.month === 0) {
        year = window.year - 1;
        month = 11;
    } else {
        year = window.year;
        month = window.month - 1;
    }
    loadAvailability(year, month);
}

function loadAvailability(year, month) {
    getAvailabilityData(year, month);
}

$(document).ready(function () {
    var today = new Date();
    fetch("https://inca-trail-availabilities.appspot.com/", {method: 'GET'})
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(function (json) {
            window.fetchResult = json;
            loadAvailability(today.getFullYear(), today.getMonth());
        })
        .catch(function (error) {
            console.log(error);
        });
});
