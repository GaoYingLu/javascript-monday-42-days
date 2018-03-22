<script>
    function getSundayDate($year, $month) {
        var firstDay = $year +'-'+ $month + '-1';
        var firstDayObj = new Date(firstDay);
        var Xq = firstDayObj.getDay();
        var sundayDate = firstDayObj - Xq * 1000*60*60*24;
        return getMyData(sundayDate);
    }

    function getMyData(sundayDate) {
        var dateData = new Array();
        for (i=0; i<42; i++)  {
            dateData.push(getMyDate(sundayDate + i * 1000*60*60*24));
        }
        console.log(dateData);
        return dateData;
    }

    function getMyDate(someTime) {
        var today   = new Date(someTime);       //获得日期
        var year    = today.getFullYear();      //获得年份
        var month   = today.getMonth() + 1;     //此方法获得的月份是从0---11，所以要加1才是当前月份
        var day     = today.getDate();          //获得当前日
        return year + "-" + month + "-" + day;
    }

    getSundayDate(2018, 1);
</script>
