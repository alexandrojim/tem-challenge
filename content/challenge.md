# Ultrastructural Segmentation of Axons and Myelin in Mouse Corpus Callosum TEM

## 1. Challenge Motivation & Biological Context

Hosted in conjunction with the **SIPAIM Conference**, this challenge addresses a critical bottleneck in quantitative neurobiology: the automated, reproducible segmentation of myelinated axons and their surrounding myelin sheaths in Transmission Electron Microscopy (TEM) micrographs.

The corpus callosum is the largest white-matter commissural tract in the mammalian brain, connecting the two cerebral hemispheres through densely packed bundles of myelinated axons running in parallel. In the central nervous system, the myelin sheath facilitates rapid, energy-efficient propagation of action potentials via saltatory conduction while acting as an essential metabolic partner to the underlying axon. In experimental models of demyelinating and neurodegenerative conditions—such as Multiple Sclerosis (MS), Amyotrophic Lateral Sclerosis (ALS), and genetic leukodystrophies—quantifying axon morphology and myelin thickness at nanometer resolution is vital for assessing white-matter pathology and remyelination.

Although modern TEM platforms can acquire large, high-resolution datasets spanning thousands of fibers, manual tracing remains prohibitively labor-intensive. Existing automated tools often struggle to generalize across tissue staining variations or fail to preserve the strict topological nesting of the axon-myelin unit, where each concentric myelin ring encloses a single axon. Accurate two-class segmentation of the **axon** and **myelin** compartments is essential for deriving reliable physical measurements, including axonal diameter, myelin thickness, and the gold-standard **$g$-ratio** (the ratio of the inner axonal diameter to the total outer fiber diameter).

---

## 2. How to Participate

1. **Register Your Participation (Individual or Team):** Complete the registration form on this page before **November 9, 2026 ($23:59\text{ UTC}$)**. If you are participating as a team, check the team box and indicate your team name so we can link your registration to your final submission.
2. **Download the Training & Validation Dataset:** Access the annotated Mouse Corpus Callosum TEM dataset via the **Dataset** section.
3. **Develop Your Segmentation Pipeline:** Train and validate your 2-class segmentation model (Axon vs. Myelin) ensuring full reproducibility.
4. **Submit Code, Method Report, and Test Predictions:** Upload your final `.zip` package through our Paris Brain Institute (ICM) OneDrive submission portal before the submission deadline.

---

## 3. Important Dates & Deadlines

| Milestone | Date | Status |
| :--- | :--- | :--- |
| **Challenge Launch & Data Release** | October 2026 | Open |
| **Registration Deadline** | **November 9, 2026 ($23:59\text{ UTC}$)** | **Active** |
| **Unlabeled Test Dataset Release** | TBA | Upcoming |
| **Final Submission Deadline (Code + PDF + Test Masks)** | TBA | Upcoming |
| **Winner Announcement & SIPAIM Session** | SIPAIM Conference | Upcoming |