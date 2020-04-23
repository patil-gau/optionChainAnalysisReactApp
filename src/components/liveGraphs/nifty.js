import React,{useState,useEffect}from 'react';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';

export default  function ApexChart(props) {



 var seriesValues = 
 {   
 series: [{
   name: 'ADV/DEC RATIO ',
  //  type: 'line',
   data: props.ratio
 }, {
   name: 'Nifty',
  //  type: 'line',
   data: props.nifty
 }]
}
     
  var optionsValues = {   

    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
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
        text: 'Loading... please wait '
      },
      colors: ['#2196F3', '#FFC107'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'AdvDec Ratio and Nifty Analysis',
        align: 'center'
      },
      grid: {
        row: {
            colors: ['#e5e5e5', 'transparent'],
            opacity: 0.2
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
        
        // range:60,
        tickAmount:10,
        categories:props.xaxis,
        title: {
         text:"time",
        },
        axisTicks:{
          show:true,
          borderType: "solid",
          offsetX:10, 
        },
        labels: {
          trim: false,
          hideOverlappingLabels: true,
          rotate:0,
          formatter: function(val, timestamp) {
            return val;
          }

        },
        tooltip: {
          enabled: true,
          fillSeriesColor: true
         
        },
       
        
      },
      yaxis:[ {
        tickAmount:6,
        title: {
          text: 'Advances/Declines'
        },
        tooltip: {
          enabled: true
        },
        // labels: {
        //   style: {
        //     colors: '#008FFB',
        //   }
        // },
      },
       { 
         seriesName: 'Nifty',
          opposite: true,
          // labels: {
          //   style: {
          //     colors: '#FF9800',
          //   }
          // },
          title: {
            text: "Nifty",
            // style: {
            //   color: '#FF9800',
            // }
          },
      },
      
    ],
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }

    },
    
    
    };

    const [series, setseries] = useState(seriesValues);
    const [options, setoptions] = useState(optionsValues);
   

   useEffect(() => {
    var xaxis=props.xaxis;
    var nifty=props.nifty;
    var ratio=props.ratio;
    seriesValues.series[0].data=ratio;
    seriesValues.series[1].data=nifty;
    optionsValues.options.xaxis.categories=xaxis
    setseries(seriesValues)
    setoptions(optionsValues)
     
   }, [props]);




    return (
      

<div id="chart">
<ReactApexChart options={options.options} series={series.series} type="area" height={350} />
</div>


    );
  }