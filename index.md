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

## What is QSM?

<a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="See <a href='https://doi.org/10.1002/nbm.3569' target='_blank'>Deistung et al.</a> Overview of Quantitative Susceptibility Mapping'</a>">Quantitative Susceptibility Mapping</a> (QSM) is an emerging form of <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="Quantitative MRI measures a physical property rather than a signal strength such that measured values are independent of scanner hardware or acquisition settings.">quantitative MRI</a> that aims to measure the <a href="#" data-placement="top" data-trigger="hover focus" data-toggle="popover" data-content="Magnetic susceptibility (χ) is the degree to which an object can be magnetised by an external magnetic field.">magnetic susceptibility</a> of objects. Susceptibility maps are derived by post-processing the phase component of the complex MRI signal from a T2*-weighted acquisition such as 3D gradient-echo (3D-GRE) or 3D echo planar imaging (3D-EPI). QSM has <a href="#" data-placement="top" data-toggle="popover" data-trigger="hover focus" data-content="See <a href='https://doi.org/10.1002/nbm.3569' target='_blank'>Deistung et al.</a> Overview of Quantitative Susceptibility Mapping'</a>">many applications</a>, mostly in human brain imaging of conditions such as traumatic brain injuries, neuroinflammatory and neurodegenerative diseases, ageing, tumours, with emerging applications across the human body and in animals.

## Acquisitions for QSM

**Acquisition type**: QSM reconstruction requires a T2*-weighted acquisition such as 3D-GRE. 3D-EPI is sometimes employed for a faster acquisition time. 

**Coil combination**: A complex-domain coil combination method must be used, rather than the popular *sum of squares* technique. While *sum of squares* works well for magnitude images and may be used in some SWI sequences, it results in phase singularities that lead to an unresolvable estimation of the magnetic field. This leads to significant artefacts in QSM and can render your results unusable.

**Spatial resolution**: Most QSM algorithms work best with isotropic resolutions. ~1mm^3 is a fairly typical resolution for QSM, though there is an arguable balance to strike for any given application.

**Single/multi-echo**: While single-echo sequences can and are used for QSM, multi-echo sequences improve cross-tissue phase contrast and can improve susceptibility estimation. Shorter echo times improve estimation of strong susceptibility sources, while longer echo times provide improved estimation of more subtle susceptibility sources. The best echo time for a particular tissue is the T2* time of the tissue. Therefore, echo times that go well beyond the typical T2* times of the imaged object or have very low SNR are less likely to provide tangible benefits.

**Flow compensation**: Flow compensation is often recommended for QSM and may improve field map estimation and susceptibility accuracy. However, the effects may be insignificant, and in practice it is difficult to use flow compensation across multiple echoes using standard sequences.

Read more about acquisition settings for QSM here.

## What does QSMxT take as inputs?

QSMxT processes data conforming to the Brain Imaging Data Structure (BIDS), and can automatically convert unorganised DICOM or NIfTI data to this format.

## What tasks does QSMxT automate?

QSMxT aims to automate all tasks to include QSM in a study, from data preparation and conversion to exporting susceptibility values across anatomical regions of interest. More specifically, QSMxT provides pipelines to automate the following tasks:

 - Data conversion (DICOM/NIfTI to BIDS)
 - QSM reconstruction (requires T2*-weighted magnitude and phase images)
 - T1 and QSM segmentation
 - Template building (requires T2*-weighted magnitude and QSM images)
 - Statistical data export to CSV (requires segmented QSM images)

### How does QSMxT work?

QSMxT bundles a wide range of dependencies for QSM processing using software containerisation technology. Without these pre-packaged containers, the wide range of dependencies are challenging to install, especially for non-developers and non-Linux users. 

QSMxT automates processing and makes it scalable using nipype. Nipype is a workflow engine that provides interfaces that can interact with a wide range of neuroimaging software. Using a pipeline data structure, nipype provides straightforward scalability across jobs and makes efficient use of the available system resources. This makes processing large datasets feasible, especially with high-performance computing platforms.

Specific details about the algorithms and underlying methods are detailed below.

#### Data conversion

If DICOM data is not already sorted by subject, session, and series, the `run_0_dicomSort.py` script can be used to recursively scans your DICOM folder and identify all DICOM files. Subjects are automatically identified using the `PatientID` DICOM field (or the `PatientName` field if preferred). Session IDs are automatically generated and incremented for each unique scan date per subject. 

If sorted DICOM data are available, the `run_1_dicomConvert.py` script can convert the sorted data to the BIDS specification. This applies `dcm2niix` for the DICOM to NIfTI conversion, and the script itself to parses and sorts data so that they conform to the BIDS specification.

If only NIfTI data is available, the `run_1_niftiConvert.py` script can be used to attempt to sort the data to conform to the BIDS specification using any information that might be available in the filepath or in matching JSON files (using customisable regular expressions). If any information is missing, a spreadsheet will be written to the output folder for you to fill out before running the command again. The important information that must be gathered for the conversion include subject IDs, session numbers, acquisition types, field strengths, echo numbers, echo times, run numbers, and whether the series represents magnitude or phase data.

#### QSM reconstruction

The `run_2_qsm.py` script will execute the QSM reconstruction pipeline against BIDS-organised data. This script applies the TGV-QSM algorithm with its Python implementation `tgv_qsm`, among other steps. TGV-QSM combines a Laplacian-based phase unwrapping and background field removal and an iterative TGV-regularisation to reconstruct QSM.

For brain masking, `run_2_qsm.py` uses a magnitude-based threshold with a hole-filling algorithm, and two-pass combination to reduce artefacts by default. A range of settings are exposed for you to customise the masking threshold or use alternate masking and combination schemes (such as BET). While BET is the de facto standard for QSM masking, we do not apply BET by default so that QSMxT may be applied to other QSM applications such as body imaging. Further, our published results indicate that magnitude-based thresholding and a two-pass inversion significantly reduces streaking artefacts near strong susceptibility sources and improves quantitative accuracy in simulated data. 

#### Segmentation

#### Template building

#### Statistical data export to CSV

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