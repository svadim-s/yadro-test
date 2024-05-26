const fetchData = async () => {
  const response = await fetch('http://impulse.yadro.msk.ru:8008/data')
  const data = await response.json()
  return data
}

const createChart = async () => {
  const data = await fetchData()

  const context = document.getElementById("chart").getContext('2d')
  
  const labels = []
  for (let j = 0; j < data.length; j++) {
    const time = new Date(data[j]._id)  
    labels.push(time.toLocaleString())
  }

  const dataSev0 = []
  const dataSev1 = []
  const dataSev2 = []
  for (let i = 0; i < data.length; i++) {
      if (data[i].sev) {
          const sevWithZero = data[i].sev.filter(item => item === 0)
          const sevWithOne = data[i].sev.filter(item => item === 1)
          const sevWithTwo = data[i].sev.filter(item => item === 2)
          dataSev0.push(sevWithZero.length)
          dataSev1.push(sevWithOne.length)
          dataSev2.push(sevWithTwo.length)
      }
  }

  const chart = new Chart(context, { 
      type: 'bar', 
      data: { 
          labels: labels, 
          datasets: [{ 
              label: 'Info', 
              backgroundColor: "green", 
              data: dataSev0, 
          }, {    
              label: 'Warn', 
              backgroundColor: "yellow", 
              data: dataSev1, 
          }, { 
              label: 'Error', 
              backgroundColor: "red", 
              data: dataSev2, 
          }], 
      }, 
      options: { 
          plugins: { 
              title: { 
                  display: true, 
                  text: 'Визуализация событий' 
              }, 
          }, 
          scales: { 
              x: { 
                  stacked: true, 
              }, 
              y: { 
                  stacked: true 
              } 
          } 
      } 
  })
}

createChart()