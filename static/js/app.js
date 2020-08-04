// Select the id of the dropdown 

var dropDownComponent = d3.select("#selDataset");

// Function to populate the dropdown with values
function displayDropDownValues(){
    
    d3.json("static/data/samples.json").then((data) => {
        
        var ids = data.names;
        
        ids.forEach(function(id) {
            
            var dropDownoption = dropDownComponent.append("option").attr("value",id).text(id); 
        
        });
    });     
    // Call the init_display to display the data of sample_id 940 by default when the page loads
    init_display(940);
}

//  This function calls the function subjectDetails which is used to display all data and plots
function init_display(id){
    subjectDetails(id);
}

// Call Function that loads the dropdown values
displayDropDownValues()

// Create an event listener for the dropdown when value is changed
dropDownComponent.on("change",dropdownchange);

// The callback for the event listener, it calls anothe function subjectDetails to display all data
// and plots of the ID selected in the dropdown
function dropdownchange()
{
    console.log("Value changed"); 
    subjectID = d3.event.target.value;
    console.log(subjectID);
    subjectDetails(subjectID);

}
    
//Function that displays the data and plots for a particular ID
function subjectDetails(id){
    // Read the json file and store the necessary data
    d3.json("static/data/samples.json").then((data) => {
        var metadata = data.metadata;
        var sampledata = data.samples;
        // console.log(metadata);
        
        // Filter the metadata releated info for a particular ID
        var filteredMetaData = metadata.filter(row => row['id'] == id);
        
        // Select the ID of the metadata display div
        var metadataDisplay = d3.select("#sample-metadata");

        //Clear out the existing html of it before displayingg new content
        metadataDisplay.html("");
        
        //Display all metadata details of the particular ID
        metadataDisplay.insert("h6").text("ID :" +filteredMetaData[0].id);
        metadataDisplay.insert("h6").text("Ethnicity :" +filteredMetaData[0].ethnicity);
        metadataDisplay.insert("h6").text("Gender :" +filteredMetaData[0].gender);
        metadataDisplay.insert("h6").text("Age :" +filteredMetaData[0].age);
        metadataDisplay.insert("h6").text("Location :" +filteredMetaData[0].location);
        metadataDisplay.insert("h6").text("BBtype :" +filteredMetaData[0].bbtype);
        metadataDisplay.insert("h6").text("WFREQ :" +filteredMetaData[0].wfreq);

        // Store the wash frequency data from the meta data

        var wash_Freq = metadata.map(row => row['wfreq']);
        console.log(wash_Freq);

        // Filter the list to get the wash frequency for the particular ID selected 
        //to be used in gauge chart
        var wash_Freq_id = filteredMetaData.map(row => row['wfreq']);

        // Filter the sample values field in the json file to get the otuids,otu sample values
        // otulabels 

        var filteredSampleData = sampledata.filter(row => row['id'] == id);
        console.log(filteredSampleData);

        var full_otuids = filteredSampleData[0].otu_ids; 
        var full_samplevalues = filteredSampleData[0].sample_values; 
        var full_otulabels = filteredSampleData[0].otu_labels;

        var data = [];

        // Push the otuids,otu sample values, otulabels in to an object of arrays
        for (var i = 0; i < full_otuids.length; i++)
        {
            data.push({
                otu_id: full_otuids[i],
                otu_value: full_samplevalues[i],
                otu_label: full_otulabels[i]
            });

        }
        // Call the function to sort the sample data based on the otu values
        sortData = sortobject(data);
        // console.log(sortData);

        // Slice the sorted data to get top ten values
        slicedData =sortData.slice(0,10);
        console.log(slicedData);

        // Reverse the sliced data for plotting the barchart
        reversedData = slicedData.reverse();

   
        // Store the x axis values, y axis values, text labels needed for the bar plot
        x_bar = reversedData.map((row) => row[1]['otu_value']);
        y_bar = reversedData.map((row) => "OTU " + row[1]['otu_id']);
        text_labels = reversedData.map((row) => row[1]['otu_label']);

        console.log(x_bar);
        console.log(y_bar);

        // Create a trace for barplot
        var trace1 = {
            x: x_bar,
            y: y_bar,
            text: text_labels,
            type: 'bar',
            orientation: 'h'
        }

        var data1 = [trace1];

        var layout1 = {
            title : `Top Ten OTU of Subject ${id}`,
            xaxis :{
                title: 'OTU Value'
            },
            yaxis: {
                title: 'OTU ID'
            }
        }
        // Barplot
        Plotly.newPlot('bar',data1,layout1);
        
        // Create a trace for bubble chart
        var trace2 = {
            x: full_otuids,
            y: full_samplevalues,
            text: full_otulabels,
            type:'bubble',
            mode: 'markers',
            marker: {
                size: full_samplevalues,
                color: full_otuids
            }
        }

        var data2 = [trace2];

        var layout2 = {
            title : `Bubble chart display of Subject ${id}`,
            xaxis:{
                title: 'OTU ID'
            },
            yaxis:{
                title: 'Sample value'
            }
        }
        //Bubble chart
        Plotly.newPlot('bubble',data2,layout2);

        //Create a trace for gauge chart
        var trace3 = {
            domain: { x: [0, 9], y: [0, 9] },
                value: `${wash_Freq_id}`,
                title: { 
                    text: "Scrubs per week" 
                },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis : {
                        range: [null,9]
                    },
                
                steps: [
                    { range: [0, 1], color: "lightgray" },
                    { range: [1, 2], color: "darkgray" },
                    { range: [2, 3], color: "gray" },
                    { range: [3, 4], color: "lightgreen" },
                    { range: [4, 5], color: "green" },
                    { range: [5, 6], color: "brown" },
                    { range: [6, 7], color: "cyan" },
                    { range: [7, 8], color: "red" },
                    { range: [8, 9], color: "black" }
                    ]
                }
        }
        

        
            
        var data3 = [trace3];

        var layout3 = {
            title: 'Belly Button Washing Frequency'
        }
        
        Plotly.newPlot('gauge',data3,layout3);

        
        
        

    });
}

// Sort function to sort the object based on otu_values
function sortobject(object)
{
    return Object.entries(object).sort((a,b) => b[1]['otu_value'] - a[1]['otu_value'])
}
