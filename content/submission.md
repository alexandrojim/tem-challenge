# Evaluation Metrics & Submission Protocol

## 1. Evaluation Metrics & How They Are Computed

All test-set submissions will be evaluated across three complementary criteria designed to measure global pixel-level overlap, physical boundary accuracy, and biological morphometry for the two target classes (**Class 1: Axon** and **Class 2: Myelin Sheath**).

### 1.1 Dice Similarity Coefficient ($\text{DSC}$)
The Dice Similarity Coefficient quantifies spatial overlap independently for the **Axon** ($c = 1$) and **Myelin** ($c = 2$) compartments between the predicted binary mask $P_c$ and the manual ground-truth mask $G_c$:

$$\text{DSC}_c = \frac{2 |P_c \cap G_c|}{|P_c| + |G_c|}$$

Both class scores ($\text{DSC}_{\text{Axon}}$ and $\text{DSC}_{\text{Myelin}}$) and their macro-average ($\text{DSC}_{\text{Mean}}$) are reported across all test micrographs.

### 1.2 95th Percentile Hausdorff Distance ($\text{HD}_{95}$)
To evaluate contour localization along the inner axonal boundary and the outer myelin boundary while suppressing sensitivity to isolated single-pixel outliers, we compute the 95th percentile Hausdorff Distance ($\text{HD}_{95}$) for each foreground class $c \in \{1, 2\}$:

$$\text{HD}_{95}(P_c, G_c) = \max \left\{ P_{95}\left(\left\{\min_{g \in \partial G_c} \|p - g\|_2 : p \in \partial P_c\right\}\right), \; P_{95}\left(\left\{\min_{p \in \partial P_c} \|g - p\|_2 : g \in \partial G_c\right\}\right) \right\} \times s$$

where $\partial P_c$ and $\partial G_c$ denote the boundary contours of the predicted and ground-truth masks, and $s = 2.152\text{ nm/pixel}$ converts pixel distances into physical nanometer ($\text{nm}$) units.

### 1.3 Morphometric Accuracy ($g$-Ratio Error)
In white-matter morphometry, the gold-standard indicator of myelination is the **$g$-ratio**, defined for each individual myelinated fiber as the ratio of the inner axonal diameter to the total outer fiber diameter (axon plus surrounding myelin sheath):

$$g = \frac{D_{\text{axon}}}{D_{\text{fiber}}}$$

Because neighboring myelin sheaths frequently touch in densely packed corpus callosum bundles while enclosed axons remain separated, our automated evaluation script extracts individual fiber instances by:
1. Identifying connected components on **Class 1 (Axon)** as unique fiber seeds.
2. Applying a topological watershed on the total fiber mask ($\text{Class 1} \cup \text{Class 2}$) to partition touching outer myelin sheaths.
3. Computing equivalent circular diameters $D_{\text{axon}} = 2\sqrt{A_{\text{axon}} / \pi}$ and $D_{\text{fiber}} = 2\sqrt{A_{\text{fiber}} / \pi}$ via region properties (`skimage.measure.regionprops`) for all matched true-positive fibers, and calculating the **Mean Absolute Error ($\text{MAE}_g$)** between predicted and ground-truth fiber $g$-ratios:

$$\text{MAE}_g = \frac{1}{N_{\text{matched}}} \sum_{i=1}^{N_{\text{matched}}} \left| g_i^{\text{pred}} - g_i^{\text{gt}} \right|$$

---

## 2. Required Submission Deliverables

To qualify for the final ranking and SIPAIM award, each registered individual or team must upload a **single `.zip` archive** named:

`TeamOrLastName_Institution_SIPAIM2026.zip`

Your archive must Follow this exact directory structure:

```text
TeamOrLastName_Institution_SIPAIM2026.zip
├── method_description.pdf
├── code/
│   ├── README.md
│   ├── requirements.txt (or environment.yml)
│   ├── train.py
│   ├── predict.py
│   └── checkpoints/ (or download script/link for trained weights)
└── predictions/
    ├── image_001.tif (or .png matching test set filenames)
    ├── image_002.tif
    └── ...
```

### Deliverable Breakdown
1. **Replicable Source Code (`code/`):**
   * Complete, self-contained training and inference scripts capable of reproducing your test predictions from raw TEM micrographs.
   * A clear `README.md` specifying hardware requirements, exact environment setup (`requirements.txt` or `environment.yml`), trained model weight access, and the single command required to run inference on a folder of test images.
2. **Method Proposal PDF (`method_description.pdf`):**
   * A **2-to-4 page technical document** (standard academic conference format) describing your data preprocessing, model architecture, loss function design, data augmentation strategy, post-processing (if any), and validation metrics.
3. **Test Dataset Predictions (`predictions/`):**
   * Single-channel integer segmentation masks (`0` = Background, `1` = Axon, `2` = Myelin) matching the exact spatial dimensions and filenames of the released test dataset.

---

## 3. How to Upload to the ICM OneDrive Portal

1. Verify that your `.zip` archive contains all three deliverables (`method_description.pdf`, `code/`, and `predictions/`).
2. Click the **"Submit Solution via ICM OneDrive"** button on this page.
3. In the OneDrive File Request upload window:
   * Select your `TeamOrLastName_Institution_SIPAIM2026.zip` file.
   * In the **First Name** field, enter your **Registered Name or Team Name**.
   * In the **Last Name** field, enter your **Institution Name (and version, e.g., `ICM_v1`)**.
4. Click **Upload** and wait for the confirmation screen before closing your browser tab.