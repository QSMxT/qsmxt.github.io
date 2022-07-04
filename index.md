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

QSMxT is an automated pipeline that excels at reconstructing, segmenting and analysing <a href="/about-qsm" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="What is QSM? Click to read more at /about-qsm">QSM</a> data across large groups of participants.

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

QSMxT bundles a wide range of dependencies for QSM processing using software containerisation technology, making it extremely <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="Easy to access and install on your available hardware.">deployable</a> and <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="Producing the same results irrespective of computational environment, including hardware and software.">computationally reproducible</a>. The wide variety of dependencies that QSMxT uses are challenging to install in a reproducible way, especially for non-developers and non-Linux users.

The <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="...">nipype</a> package is used to automate QSMxT's processing and make it scalable. Nipype is a workflow engine that can interact with a wide range of neuroimaging software, and provides straightforward scalability across jobs using an asynchronous directed graph data structure. This makes the automated processing of large datasets feasible, especially with high-performance computing systems (HPCs).

## What algorithms does QSMxT use?

The algorithms used by QSMxT are detailed on the <a href="/algorithms">algorithms</a> page. 

## How did you choose the algorithms for QSMxT?

A huge number of QSM algorithms have been proposed in recent years, and each have their own advantages and disadvantages. Since we needed to choose specific algorithms to bundle with QSMxT, we had to make challenging choices which require justification. Our priorities with with QSMxT are as follows:

 - Processing tasks must be automated and not require manual interventions between intermediate steps, such that minimal domain knowledge is required
 - Processing tasks must be scalable across processors or nodes in HPCs, such that large clinical datasets can be processed to produce meaningful results
 - Algorithms and implementations must perform competitively with respect to a ground truth (e.g. in the QSM challenge 2.0 dataset)
 - Algorithms and implementations must be open-source
 - Algorithms and implementations must not require proprietary licensing (e.g. MATLAB)
 - Algorithms and implementations must not rely on priors for specific applications such as brain imaging or healthy subjects only

With these priorities in mind, we see QSMxT as an important software suite that lowers the barrier-to-entry for QSM users and enables large-scale clinical studies. Support for pipelines like this is crucial to advance the method and ultimately pave the way towards clinical integration.

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>