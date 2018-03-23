<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <title>实现一个简单的时间控件</title>
</head>
<body>
<script src="jquery-3.1.1.min.js"></script>
<input type="text" id="current-input-date-value" value="" placeholder="点击选择日期"/>
<div id="date-show"></div>

<script>
    function getSundayDate($year, $month) {
        var firstDay = $year +'-'+ $month + '-1';
        var dateObj = getDateObj(firstDay);
        var Xq = dateObj.getDay();
        return sundayDate = dateObj - Xq * 1000*60*60*24;
    }

    function getSixWeeks(sundayDate) {
        var dataArr = new Array();
        for (i=0; i<42; i++) {
            var newDate = sundayDate + i * 1000*60*60*24;

            var dateObj = new Date(newDate);

            dataArr.push(getViewTimeByObj(dateObj));
        }
        return dataArr;
    }

    function getDateObj(someTime) {
        if (someTime) {
            return new Date(someTime.replace(/-/g, "/"));
        } else {
            return new Date();
        }
    }

    function getDateByObj(Obj) {
        return Obj.getDate();
    }

    function getMonthByObj(Obj) {
        return Obj.getMonth()+1;
    }

    function getYearByObj(Obj) {
        return Obj.getFullYear();
    }

    function getViewTimeByObj(Obj) {
        return getYearByObj(Obj) +"-"+ getMonthByObj(Obj) +"-"+ getDateByObj(Obj);
    }

    function getOnlyDay(someTime) {
        var dateTimeObj = new Date(someTime.replace(/-/g, "/"));
        return dateTimeObj.getDate();
    }

    function getPreOrNextMonthObj(someDate, action) {
        //先变成当月一日, ios 要更为严格
        someDate = someDate + '-1';
        var timeObj = new Date(someDate.replace(/-/g, "/"));
        if(action == 'pre')
        {
            timeObj.setMonth(timeObj.getMonth()-1);
        }else{
            timeObj.setMonth(timeObj.getMonth()+1);
        }
        return timeObj;
    }

    $("#current-input-date-value").click(function () {
        // 获取当前 文本框 中的日期
        var inputDate   = $("#current-input-date-value").val();
        var dateObj     = getDateObj(inputDate);
        var dateYear    = getYearByObj(dateObj);
        var dateMonth   = getMonthByObj(dateObj);


        // 获取当月1日是礼拜几，再推算礼拜日是几号？
        var dateSunDay  = getSundayDate(dateYear, dateMonth);
        // 获取6周时间
        var fullWeeks   = getSixWeeks(dateSunDay);
        outPutHtml(inputDate, dateYear, dateMonth, fullWeeks);
    });

    function outPutHtml(currentDate, dateYear, dateMonth, fullWeeks) {
        var html = "<table>";
        html += "<tr align='center'>";
        html += "<td onclick='pre_month()'><<</td>";
        html += "<td colspan='4' id='current_year_month'>" +dateYear+ "-" +dateMonth+ "</td>";
        html += "<td id='next_month' onclick='next_month()'>>></td></tr>";
        html += "<tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr>";
        html += "<tr align='center'>";

        for (i in fullWeeks) {
            var currentDayClass= "";
            if (currentDate == fullWeeks[i]) {
                currentDayClass = "style='border:1px solid red;'";
            }
            html += "<td "+currentDayClass+" onclick='setNewTime(\""+fullWeeks[i]+"\")'>"+getOnlyDay(fullWeeks[i])+"</td>";
            if ((parseInt(i) + 1) % 7 == 0) {
                html += "</tr><tr>";
            }
        }
        $("#date-show").html(html);
    }



    function getCurrentYearMonth() {
        return $("#current_year_month").text();
    }

    function pre_month() {
        var currentYearMonth = getCurrentYearMonth();
        var dateObj = getPreOrNextMonthObj(currentYearMonth, 'pre');
        // 获取当月1日是礼拜几，再推算礼拜日是几号？
        var dateSunDay  = getSundayDate(getYearByObj(dateObj), getMonthByObj(dateObj));
        // 获取6周时间
        var fullWeeks   = getSixWeeks(dateSunDay);
        outPutHtml(getYearByObj(dateObj)+"-"+getMonthByObj(dateObj), getYearByObj(dateObj), getMonthByObj(dateObj), fullWeeks);
    }

    function next_month() {
        var currentYearMonth = getCurrentYearMonth();
        var dateObj = getPreOrNextMonthObj(currentYearMonth, 'next');
        // 获取当月1日是礼拜几，再推算礼拜日是几号？
        var dateSunDay  = getSundayDate(getYearByObj(dateObj), getMonthByObj(dateObj));
        // 获取6周时间
        var fullWeeks   = getSixWeeks(dateSunDay);
        outPutHtml(getYearByObj(dateObj)+"-"+getMonthByObj(dateObj), getYearByObj(dateObj), getMonthByObj(dateObj), fullWeeks);
    }

    function setNewTime(newTime) {
        $("#current-input-date-value").val(newTime);
        $("#date-show").html('');
    }


</script>
</body>
</html>
