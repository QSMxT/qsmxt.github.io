---
layout: default
title: T1/QSM Segmentation
nav_order: 4
parent: Using QSMxT
permalink: /using-qsmxt/segmentation
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# Segmentation

To run the segmentation pipeline, data must first conform to the BIDS specification (see [data preparation](/using-qsmxt/data-preparation)). Further, QSM reconstruction must be complete (see [QSM reconstruction](/using-qsmxt/qsm-reconstruction)).

This pipeline will segment T1-weighted images before registering them to the T2\*-weighted space (the same space as QSM results). Segmentation is performed using FastSurfer running using CPU processing. Registration is performed using ``. 

Use the following command to initiate the segmentation pipeline (replacing `YOUR_BIDS_DIR` with your BIDS directory, `YOUR_QSM_DIR` with the QSM output directory, and `segmentations` with your preferred output directory for segmentation results):

```bash
python3 /opt/QSMxT/run_3_segment.py YOUR_BIDS_DIR YOUR_QSM_DIR segmentations
```

## Parameter information

Several parameters can be customised for the segmentation (see `python3 /opt/QSMxT/run_3_segment.py --help`).

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>

