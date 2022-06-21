---
layout: default
title: QSM Reconstruction
nav_order: 3
parent: Using QSMxT
permalink: /using-qsmxt/qsm-reconstruction
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# QSM Reconstruction

To run the QSM pipeline, data must first conform to the BIDS specification. Use the following command to initiate the QSM pipeline:

```bash
python3 /opt/QSMxT/run_2_qsm.py YOUR_BIDS_DIR qsm
```

## Parameters

 - `--subject_pattern`: Pattern used to match subject folders in `bids_dir` (default: `sub*`)
 - `--subject_pattern`: ...



| `--session_patttern`         | Pattern used to match session folders in subject folders in `bids_dir` (default: `ses*`) |
| `--magnitude_pattern`        | Pattern to match magnitude files within the BIDS directory. The `{subject}`, `{session}` and `{run}` placeholders must be present.  (default: `{subject}/{session}/anat/*{run}*mag*nii*`) |
| `--phase_pattern`            | ... |
| `--subjects`                 | ... |
| `--sessions`                 | ... |
| `--num_echoes`               | ... |
| `--masking`                  | ... |
| `--single_pass`              | ... |
| `--qsm_iterations`           | ... |
| `--inhomogeneity_correction` | ... |
| `--threshold`                | ... |
| `--bet_fractional_intensity` | ... |
| `--extra_fill_strength`      | ... |
| `--add_bet`                  | ... |
| `--pbs`                      | ... |
| `--n_procs`                  | ... |
| `--debug`                    | ... |

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>

