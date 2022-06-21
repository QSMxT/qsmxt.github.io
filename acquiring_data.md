---
layout: default
title: Acquiring data
permalink: /about-qsm/acquiring-data
nav_order: 4
---

<head>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</head>

# Acquiring data for QSM

**Acquisition type**: QSM reconstruction requires a T2*-weighted acquisition such as 3D-GRE. 3D-EPI is sometimes employed for a faster acquisition time. 

**Coil combination**: A complex-domain coil combination method must be used, rather than the popular *sum of squares* technique. While *sum of squares* works well for magnitude images and may be used in some SWI sequences, it results in phase singularities that lead to an unresolvable estimation of the magnetic field. This leads to significant artefacts in QSM and can render your results unusable.

**Spatial resolution**: Most QSM algorithms work best with isotropic resolutions. ~1mm^3 is a fairly typical resolution for QSM, though there is an arguable balance to strike for any given application.

**Single/multi-echo**: While single-echo sequences can and are used for QSM, multi-echo sequences improve cross-tissue phase contrast and can improve susceptibility estimation. Shorter echo times improve estimation of strong susceptibility sources, while longer echo times provide improved estimation of more subtle susceptibility sources. The best echo time for a particular tissue is the T2* time of the tissue. Therefore, echo times that go well beyond the typical T2* times of the imaged object or have very low SNR are less likely to provide tangible benefits.

**Flow compensation**: Flow compensation is often recommended for QSM and may improve field map estimation and susceptibility accuracy. However, the effects may be insignificant, and in practice it is difficult to use flow compensation across multiple echoes using standard sequences.

Read more about acquisition settings for QSM here.

<script>
$(document).ready(function(){
    $('[data-toggle="popover"]').popover();   
});
$("[data-toggle=popover]")
.popover({html:true})
</script>

