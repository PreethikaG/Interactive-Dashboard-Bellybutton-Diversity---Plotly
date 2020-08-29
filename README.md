# Interactive-Dashboard-Bellybutton-Diversity---Plotly

# Overview -

In this project, I built an interactive dashboard using Plotly to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

# Dashboard design - 
The dashboard contains a series of interactive charts(bar,bubble,gauge,etc), a small panel that displays information about the data and a dropdown for the user to select the desired patient ID. All charts get updated once the value in the dropdown changes.

1. A horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
![hw01.png] (/static/Images/hw01.png)
2. A bubble chart that displays each sample.
![bubble_chart.png] (/static/Images/bubble_chart.png)
3. A panel displaying the sample metadata, i.e., an individual's demographic information.
![hw03.png] (/static/Images/hw03.png)
4. A gauge Chart that plots the weekly washing frequency of the individual.
![gauge.png] (/static/Images/gauge.png)

# Deployment -
The app is deployed using Heroku and FLASK. The link to the app is - https://pg-bellybuttondiversity.herokuapp.com/

