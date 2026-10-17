# TEM Imaging Dataset of the Mouse Corpus Callosum

## 1. Dataset Overview

This dataset comprises a curated collection of **608 minimally processed, high-resolution Transmission Electron Microscopy (TEM) images** acquired from the corpus callosum (white matter) of mouse (*Mus musculus*) brain tissue at the **Paris Brain Institute (Institut du Cerveau - ICM)**.

The dataset was assembled to support the development and benchmarking of deep-learning and image-processing models for the automatic segmentation of axons and their surrounding myelin sheaths.

| Item | Specification |
| :--- | :--- |
| **Imaging Modality** | Transmission Electron Microscopy (TEM) |
| **Anatomical Region** | Corpus callosum (white matter) |
| **Species** | Mouse (*Mus musculus*) |
| **Total Images** | $608$ single-channel grayscale micrographs |
| **Annotated Ground-Truth Subset** | $157$ images ($\approx 25.8\%$ of the collection, expanding progressively) |
| **Target Foreground Classes** | **2 Classes:** Axons and Myelin sheaths |
| **Intended Use** | Supervised, semi-supervised, or self-supervised segmentation training & evaluation |

---

## 2. Target Classes & Topological Nesting

At TEM resolution, each myelinated fiber exhibits high contrast between the lipid-rich, electron-dense myelin sheath (dark) and the enclosed axoplasm (lighter). Ground-truth masks use the following integer label encoding:

| Label ID | Semantic Class | Morphological Description |
| :--- | :--- | :--- |
| **`0`** | **Background / Extra-axonal Space** | Surrounding neuropil and tissue matrix between myelinated fibers |
| **`1`** | **Axon** | Cross-sections of axoplasm appearing as lighter, roughly circular internal regions |
| **`2`** | **Myelin Sheath** | Concentric, electron-dense (dark) rings of tightly wrapped membrane lamellae enclosing each axon |

> **Topological Note:** Because each myelin ring wraps around exactly one axon, **Class 1 (Axon)** and **Class 2 (Myelin Sheath)** form strictly nested structures. Preserving this topological nesting is crucial both for segmentation post-processing and for instance-level morphometric evaluation.

---

## 3. Image Acquisition & Technical Specifications

All micrographs were acquired on a transmission electron microscope operated in imaging mode using an AMT NS12 camera system. The acquisition parameters below are read directly from the embedded metadata:

| Parameter | Value |
| :--- | :--- |
| **Microscope Mode** | TEM — Imaging mode |
| **Accelerating Voltage** | $100\text{ kV}$ |
| **Direct Magnification** | $3000\times$ |
| **Camera System** | AMT NS12 (AMT Camera System) |
| **Pixel Calibration** | $0.002152\text{ }\mu\text{m/pixel}$ ($\approx 2.15\text{ nm/pixel}$) |
| **Embedded Scale Bar** | $1\text{ }\mu\text{m}$ ($\approx 465\text{ pixels}$ at stated calibration) |
| **Exposure & Frame Averaging** | $480\text{ ms} \times 4$ standard frames (averaged for noise reduction) |
| **Sensor Resolution & Binning** | Binning $= 1$, Gain $= 1$ (full native sensor resolution, no on-sensor pooling) |
| **Radiometric Response** | Gamma $= 1.00$ (linear response), Normal contrast, Sharpening $=$ None |

### Key Image Characteristics for Modeling
* **Nanometer-Scale Spatial Resolution:** At $\approx 2.15\text{ nm/pixel}$, the spatial resolution resolves individual myelin lamellae as well as the sharp boundary between the inner myelin sheath and the axoplasm.
* **Quantitative Intensity Fidelity:** A linear gamma of $1.00$ with no artificial sharpening preserves the quantitative relationship between pixel intensity and tissue electron density.
* **High Signal-to-Noise Ratio:** Frame averaging across $4$ exposures of $480\text{ ms}$ yields clean edges along the inner axonal and outer myelin boundaries.