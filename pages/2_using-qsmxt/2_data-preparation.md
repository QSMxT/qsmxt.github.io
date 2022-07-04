---
layout: default
title: Data preparation
nav_order: 2
parent: Using QSMxT
permalink: /using-qsmxt/data-preparation
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# Data preparation

QSMxT requires BIDS-organised data. If your data is not prepared according to the BIDS specification, several tools are provided by QSMxT for you to do this automatically depending on your available data.

## I have unsorted DICOMs

To convert to BIDS, your DICOM data must at least be sorted within subject, session and series folders. To sort your DICOM data, run the following, replacing `YOUR_DICOM_DIR` with your DICOM directory, and `dicoms_sorted` with your preferred output directory. If the output directory does not exist, it will be created.

```bash
python3 /opt/QSMxT/run_0_dicomSort.py YOUR_DICOM_DIR dicoms_sorted
```

## I have sorted DICOMs

If your DICOM data is sorted within subject, session and series folders, you can convert to BIDS using the following:

```bash
python3 /opt/QSMxT/run_1_dicomConvert.py SORTED_DICOM_DIR bids
```

Since DICOM headers do not describe parameter weighting (e.g. T1, T2*, etc), QSMxT will try to identify the weighting based on the `ProtocolName` DICOM field. Images with a `ProtocolName` matching any of `[*qsm*, *gre*, *epi*]` will be considered T2*-weighted, and those matching `[*t1w*]` will be considered T1-weighted. Alternate `ProtocolName` patterns can be specified using command-line arguments (see `run_1_dicomConvert.py --help`).

In addition to the weighting, QSMxT will also attempt to identify run numbers based on the order of the `SeriesNumber` field, echo numbers based on the `EchoTime` field, and whether a series represents magnitude or phase data based on the `ImageType` field.

## I have NIfTI files

NIfTI files store insufficient information in their header to convert to BIDS. However, for QSM, we only need the image weighting (T2*-weighted or T1-weighted), field strength, run numbers, echo numbers, echo times, and image types (magnitude or phase). If your NIfTI data contains some of this information in the file path or an adjacent JSON header, the `run_1_niftiConvert.py` script will attempt to extract this information using customisable match patterns and regular expresions. Use the following command to convert NIfTI to BIDS:

```bash
python3 /opt/QSMxT/run_1_niftiConvert.py YOUR_NIFTI_DIR bids
```

If any information is missing for the conversion to take place, a spreadsheet (CSV file) will be written for you to enter the information. You can use a spreadsheet editor such as Microsoft Excel or LibreOffice Calc to do this. Then, run the same command again and the conversion should complete. Alternatively, you can customise the match patterns and regular expressions to improve the information extraction (see `run_1_niftiConvert.py --help` for details).

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>

