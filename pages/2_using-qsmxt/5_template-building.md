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

To run the template building pipeline, data must first conform to the BIDS specification (see [data preparation](/using-qsmxt/data-preparation)). Further, QSM reconstruction must be complete (see [QSM reconstruction](/using-qsmxt/qsm-reconstruction)).

**NOTE**: Template-building only performs well if you have a large number of subjects (20+) in your dataset.

This pipeline will apply a minimum deformation averaging algorithm against the T2\*-weighted magnitude images to construct a group space for the study. This will bring all T2\*-weighted images into the same space and generate an average of all images, called a *template*. The same transformations will be applied to QSM results to bring them into the group space and an equivalent QSM template will also be generated. Finally, QSMxT will also output all ANTs transformations as text files. This is useful if you wish to manually draw segmentations to apply across all subjects as part of a quantitative analysis of specific anatomical regions that are not covered by the segmentation pipeline. The transformations are also useful if you wish to derive multiple group templates using the transformations to compare a control group with a disease group, for example.

Use the following command to initiate the template building pipeline (replacing `YOUR_BIDS_DIR` with your BIDS directory, `YOUR_QSM_DIR` with the QSM output directory, and `template` with your preferred output directory for template building results):

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

