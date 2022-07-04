---
layout: default
title: Template building
nav_order: 5
parent: Using QSMxT
permalink: /using-qsmxt/template-building
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# Template building

## Why use this pipeline?

This step is useful if:

 - You have 20+ subjects in your cohort
 - You wish to manually draw segmentations that can easily be applied to all subjects for quantitative analysis, separately from the subject-specific segmentations produced by the [segmentation pipeline](/using-qsmxt/segmentation)
 - You wish to segment data but do not have T1-weighted images available
 - You wish to generate average QSM or T2\*-weighted magnitude images for your cohort

## What does this pipeline do?

This pipeline will apply a minimum deformation averaging algorithm against T2\*-weighted magnitude images to construct a group space for the study. This will bring all T2\*-weighted images into the same space and generate an average of all images, called a *template*. The same transformations will be applied to QSM results to bring them into the group space and an equivalent QSM template will be generated. Finally, QSMxT will output all ANTs transformations as text files.

## Running the pipeline

Use the following command to initiate the template building pipeline (replacing `YOUR_BIDS_DIR` with your BIDS directory, `YOUR_QSM_DIR` with the QSM output directory, and `template` with your preferred output directory for template building results). Please note that a large number of subjects is required for this step to work effectively (20+ subjects).

```bash
python3 /opt/QSMxT/run_4_template.py YOUR_BIDS_DIR YOUR_QSM_DIR template
```

## Parameter information

Several parameters can be customised for the segmentation (see `python3 /opt/QSMxT/run_4_template.py --help`).

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>

