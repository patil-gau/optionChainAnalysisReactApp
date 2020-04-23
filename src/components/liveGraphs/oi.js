import React,{useEffect,useState} from 'react';
import ReactApexChart from 'react-apexcharts'
import moment from 'moment'




export default function ApexChart(props) {


  console.log(props.xaxis)
  console.log(props.puts)

  
   var seriesValues={
    series: [{
    name: 'CALLS',
    data:props.calls,
  },
  {
      name: 'PUTS',
      data:props.puts,
    },
  ]
  }   
  
   var optionsValues = {
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true,
          type: 'x',  
          autoScaleYaxis: true, 
          zoomedArea: {
            fill: {
              color: '#90CAF9',
              opacity: 0.9
            } ,
            stroke: {
              color: '#0D47A1',
              opacity: 0.4,
              width: 1
            } 
        }, 
        }
      },
      noData: {
        text: 'Loading...'
      },
      colors: ['#8BC34A', '#f44336'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Open Intrest Analysis',
        align: 'center'
      },
      grid: {
        row: {
            colors: ['#e5e5e5', 'transparent'],
            opacity: 0.4
        }, 
        column: {
            colors: ['#f8f8f8', 'transparent'],
        }, 
        xaxis: {
          lines: {
            show: true
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      xaxis: {
        offsetX: 20,
        title: {
         text:"time"
        },
        label:{
       trim: false,
       rotate: 0,
       hideOverlappingLabels: true,
        },
        
        axisTicks:{
          show:true,
          borderType: "solid",
          offsetX:10, 
        },
        tickAmount: 10,
        tooltip: {
          enabled: true,
          fillSeriesColor: true
         
        },
        categories: props.xaxis,

        labels: {
          rotate:0,
         
          hideOverlappingLabels: true,
          formatter: function(val, timestamp,index) {

            //  console.log(val && val.split(':')[1][1] === '0' ? value : '');

            // return moment(timestamp).format("DD MMM YYYY")+"  "+val;
           
            return val;
          }

        },
       
      },
      yaxis: {
        tickAmount:6,
        title: {
          text: 'OI'
        },
        tooltip: {
          enabled: true
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }

    },
  }

    

  const [series, setseries] = useState(seriesValues);
  const [options, setoptions] = useState(optionsValues)

  useEffect(() => {
    var xaxis=props.xaxis;
    var puts=props.puts;
    var calls=props.calls;

    

    seriesValues.series[0].data=calls;
    seriesValues.series[1].data=puts;
    optionsValues.options.xaxis.categories=xaxis

  
    setseries(seriesValues);
    setoptions(optionsValues)
    
  }, [props])



   
      return (
        

  <div id="chart">
<ReactApexChart options={options.options} series={series.series} type="area" height={350} />
</div>


      );
}