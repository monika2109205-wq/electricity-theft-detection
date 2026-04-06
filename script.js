let chart;

function loadChart(type) {
    const ctx = document.getElementById('chart');

    if (chart) {
        chart.destroy();
    }

    let labels, data;

    if (type === 'daily') {
        labels = ['1AM','5AM','9AM','1PM','5PM','9PM'];
        data = [5, 8, 20, 35, 10, 6]; // 🔥 abnormal drop at night
    }

    else if (type === 'weekly') {
        labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
        data = [30, 45, 5, 60, 25, 40, 35]; // 🔴 Wednesday suspicious
    }

    else if (type === 'monthly') {
        labels = ['Week1','Week2','Week3','Week4'];
        data = [200, 180, 50, 210]; // 🔴 Week3 suspicious
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Electricity Usage (Units)',
                data: data,
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: function(context) {
                    // Highlight lowest value as suspicious
                    let min = Math.min(...data);
                    return context.raw === min ? 'red' : 'blue';
                }
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: type.toUpperCase() + ' Usage Analysis'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let min = Math.min(...data);
                            if (context.raw === min) {
                                return "⚠️ Suspicious drop detected!";
                            }
                            return "Usage: " + context.raw + " units";
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: type.toUpperCase() + ' Time Period'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Electricity Units'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Default chart
window.onload = () => loadChart('weekly');
function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Simple credentials
    if (user === "admin" && pass === "1234") {
        window.location.href = "index.html";
    } else {
        document.getElementById("error").innerText = "Invalid Credentials!";
    }
}