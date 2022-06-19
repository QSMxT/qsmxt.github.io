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

# QSMxT: An Automated, end-to-end Quantitative Susceptibility Mapping pipeline

## What is QSM?

<a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="See <a href='https://doi.org/10.1002/nbm.3569' target='_blank'>Deistung et al.</a> Overview of Quantitative Susceptibility Mapping'</a>">Quantitative Susceptibility Mapping</a> (QSM) is an emerging form of <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="Quantitative MRI measures a physical property rather than a signal strength such that measured values are independent of scanner hardware or acquisition settings.">quantitative MRI</a> that aims to measure the <a href="#" data-placement="top" data-trigger="hover focus" data-toggle="popover" data-content="Magnetic susceptibility (χ) is the degree to which an object can be magnetised by an external magnetic field.">magnetic susceptibility</a> of objects. Susceptibility maps are derived by post-processing the phase component of the complex MRI signal in a T2*-weighted acquisition such as 3D gradient-echo (3D-GRE) or 3D echo planar imaging (3D-EPI). QSM has <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="See <a href='https://doi.org/10.1002/nbm.3569' target='_blank'>Deistung et al.</a> Overview of Quantitative Susceptibility Mapping'</a>">many applications</a>, mostly in human brain imaging of conditions such as traumatic brain injuries, neuroinflammatory and neurodegenerative diseases, ageing, tumours, with emerging applications across the human body and in animals.

## What is QSMxT?

QSMxT is a complete and end-to-end QSM processing and analysis pipeline that excels at automatically reconstructing, segmeneting and analysing QSM data across large groups of participants.

QSMxT provides pipelines implemented in Python that:

1. Automatically convert unorganised DICOM or NIfTI data to the Brain Imaging Data Structure (BIDS)
2. Automatically reconstruct QSM, including steps for:
  1. Robust masking without anatomical priors
  2. Phase unwrapping (Laplacian based)
  3. Background field removal + dipole inversion (tgv_qsm)
  4. Multi-echo combination
3. Automatically generate a common group space for the whole study, as well as average magnitude and QSM images that facilitate group-level analyses.
4. Automatically segment T1w data and register them to the QSM space to extract quantitative values in anatomical regions of interest.
5. Export quantitative data to CSV for all subjects using the automated segmentations, or a custom segmentation in the group space (we recommend ITK snap http://www.itksnap.org/pmwiki/pmwiki.php to perform manual segmenations).

QSMxT's containerised implementation makes all required external dependencies available in a reproducible and scalable way, supporting MacOS, Windows and Linux, and with options for parallel processing via PBS systems.

If you use QSMxT for a study, please cite https://doi.org/10.1101/2021.05.05.442850.

QSMxT Process Diagram

## Heading

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>