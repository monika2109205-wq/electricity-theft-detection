let chart;

async function loadChart(type) {
    const res = await fetch("/usage");
    const apiData = await res.json();

    const ctx = document.getElementById('chart');

    if (chart) chart.destroy();

    let labels, data;

    if (type === 'daily') {
        labels = ['1AM','5AM','9AM','1PM','5PM','9PM'];
        data = apiData.daily;
    } else if (type === 'weekly') {
        labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        data = apiData.weekly;
    } else {
        labels = ['Week1','Week2','Week3','Week4'];
        data = apiData.monthly;
    }

    // 🔴 Detect suspicious (very low usage)
    let pointColors = data.map(value => 
        value < 10 ? 'red' : 'blue'
    );

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: 'Electricity Usage',
                data,
                borderWidth: 2,
                pointBackgroundColor: pointColors, // 🔴 red dots
                pointRadius: 6
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Units Consumed'
                    }
                }
            }
        }
    });
}

window.onload = () => {
    if (document.getElementById('chart')) {
        loadChart('weekly');
    }
};