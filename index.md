---
layout: default
title: QSMxT
nav_order: 1
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# QSMxT: Automated and Scalable QSM

QSMxT is an automated pipeline that excels at reconstructing, segmenting and analysing QSM data across large groups of participants.

## What does QSMxT take as inputs?

QSMxT processes data conforming to the Brain Imaging Data Structure (BIDS), and can automatically convert unorganised DICOM or NIfTI data to this format.

## What tasks does QSMxT automate?

QSMxT aims to automate all tasks to include QSM in a study, from data preparation and conversion to exporting susceptibility values across anatomical regions of interest. More specifically, QSMxT provides pipelines to automate the following tasks:

 - Data conversion (DICOM/NIfTI to BIDS)
 - QSM reconstruction (requires T2*-weighted magnitude and phase images)
 - T1 and QSM segmentation
 - Template building (requires T2*-weighted magnitude and QSM images)
 - Statistical data export to CSV (requires segmented QSM images)

## How does QSMxT work?

QSMxT bundles a wide range of dependencies for QSM processing using software containerisation technology. Without these pre-packaged containers, the wide range of dependencies are challenging to install, especially for non-developers and non-Linux users. 

QSMxT automates processing and makes it scalable using nipype. Nipype is a workflow engine that provides interfaces that can interact with a wide range of neuroimaging software. Using a pipeline data structure, nipype provides straightforward scalability across jobs and makes efficient use of the available system resources. This makes processing large datasets feasible, especially with high-performance computing platforms.

Specific details about the algorithms and underlying methods are detailed below.

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>