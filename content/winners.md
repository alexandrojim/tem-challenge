# Challenge Leaderboard & Winner Announcement

The final test-set evaluation results and winning teams will be announced during the **SIPAIM Conference** and published in the table below once the submission and code-verification phases conclude.

## Official Final Standings

| Rank | Participant / Team Name | Institution | $\text{DSC}_{\text{Axon}} \uparrow$ | $\text{DSC}_{\text{Myelin}} \uparrow$ | $\text{HD}_{95}\text{ (nm)} \downarrow$ | $g\text{-Ratio MAE} \downarrow$ | Method PDF & Code | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **1st Place** | *TBA at SIPAIM* | *TBA* | — | — | — | — | — | 
| **2nd Place** | *TBA at SIPAIM* | *TBA* | — | — | — | — | — | 
| **3rd Place** | *TBA at SIPAIM* | *TBA* | — | — | — | — | — | 

## Evaluation & Verification Policy

* **Replicability Check:** Before official winners are confirmed, the organizing committee will verify that the top-scoring teams' submitted `/code` repositories and model weights reproduce their submitted `/predictions` masks on the held-out test micrographs.

* **Tie-Breaking Rule:** Overall ranking is determined by the aggregate rank across $\text{DSC}_{\text{Mean}}$, $\text{HD}_{95\text{, Mean}}$, and $g\text{-Ratio MAE}$. In the event of a tie, the submission with the lowest physical boundary error ($\text{HD}_{95\text{, Mean}}$) will be ranked higher.