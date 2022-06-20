---
layout: default
title: QSMxT's algorithms
nav_order: 5
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# QSMxT's Algorithms

This page details the underlying algorithms and methods used by QSMxT. 

## Data conversion

If DICOM data is not already sorted by subject, session, and series, the `run_0_dicomSort.py` script can be used to recursively scans your DICOM folder and identify all DICOM files. Subjects are automatically identified using the `PatientID` DICOM field (or the `PatientName` field if preferred). Session IDs are automatically generated and incremented for each unique scan date per subject. 

If sorted DICOM data are available, the `run_1_dicomConvert.py` script can convert the sorted data to the BIDS specification. This applies `dcm2niix` for the DICOM to NIfTI conversion, and the script itself to parses and sorts data so that they conform to the BIDS specification.

If only NIfTI data is available, the `run_1_niftiConvert.py` script can be used to attempt to sort the data to conform to the BIDS specification using any information that might be available in the filepath or in matching JSON files (using customisable regular expressions). If any information is missing, a spreadsheet will be written to the output folder for you to fill out before running the command again. The important information that must be gathered for the conversion include subject IDs, session numbers, acquisition types, field strengths, echo numbers, echo times, run numbers, and whether the series represents magnitude or phase data.

## QSM reconstruction

The `run_2_qsm.py` script will execute the QSM reconstruction pipeline against BIDS-organised data. This script applies the TGV-QSM algorithm with its Python implementation `tgv_qsm`, among other steps. TGV-QSM combines a Laplacian-based phase unwrapping and background field removal and an iterative TGV-regularisation to reconstruct QSM.

For brain masking, `run_2_qsm.py` uses a magnitude-based threshold with a hole-filling algorithm, and two-pass combination to reduce artefacts by default. A range of settings are exposed for you to customise the masking threshold or use alternate masking and combination schemes (such as BET). While BET is the de facto standard for QSM masking, we do not apply BET by default so that QSMxT may be applied to other QSM applications such as body imaging. Further, our published results indicate that magnitude-based thresholding and a two-pass inversion significantly reduces streaking artefacts near strong susceptibility sources and improves quantitative accuracy in simulated data. 

## Segmentation

## Template building

## Statistical data export to CSV

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

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>

