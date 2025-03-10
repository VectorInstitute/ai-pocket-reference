# Energy & Carbon Footprint Tracking in AI: A Quick Reference

## Why Measure Carbon Footprint in AI?

**Carbon footprint** refers to the total greenhouse gas (GHG) emissions caused by an activity. In machine learning, large-scale model training consumes significant energy, contributing to emissions. 

### Why Track Energy & Emissions?
1. **AI’s Environmental Impact** – Large ML models require high computational power, leading to increased energy consumption.
2. **Optimization & Efficiency** – Identifying high-energy-consuming functions helps optimize and reduce resource waste.
3. **Regulatory & Compliance Needs** – Researchers, businesses, and policymakers aim to quantify AI’s carbon impact.
4. **Cost Reduction** – Efficient energy usage leads to lower operational costs.

Measuring AI’s energy consumption allows **better optimization, improved sustainability, and transparency** in reporting emissions.

---

## 📌 **Quick Reference to Energy/Carbon Tracking Tools**

Below is a high-level comparison of **popular open-source tools** for measuring energy consumption and carbon footprint in machine learning workloads.

| **Tool**                         | **Measurement Level**                                               | **Compatibility**                                      | **Ease of Use**                                  | **Installation**       | **Real-Time Monitoring?**                | **License**            | **Docs & Support**                          | **Notes**                                   |
|----------------------------------|-------------------------------------------------------------------|------------------------------------------------------|-------------------------------------------------|----------------------|---------------------------------------|------------------------|----------------------------------------|-------------------------------------------|
| **CentML DeepView**              | Code + model level, predicts usage on different GPUs/clouds       | Most GPUs, cloud providers                           | Intuitive UI, runs in IDE (VSCode)             | VSCode plugin       | ✅ Inline monitoring, interactive UI  | Apache 2.0 (Free)    | [GitHub Repo](https://github.com/CentML/DeepView.Profile) | Best for real-time analysis in VSCode |
| **AIPowerMeter**                 | Function-level CPU/GPU (Intel CPU only, GPU not always covered)   | Intel processors (no guarantee for GPUs)            | Requires experiment setup                      | Script to install   | ❌ No real-time (post-run results)   | Free                   | [Docs](https://greenai-uppa.github.io/AIPowerMeter/) | Best for CPU-centric measurement |
| **CarbonAI**                     | Function-level monitoring                                         | Most platforms                                      | Requires code instrumentation                 | Python package     | ❌ No real-time (post-run results)   | Free                   | [GitHub Repo](https://github.com/Capgemini-Invent-France/CarbonAI) | Simple setup, minimal overhead |
| **CarbonTracker**                | Code-level usage (Nvidia GPU, Intel CPU, Slurm, Colab, Jupyter)  | Nvidia GPU, Intel CPU, HPC platforms                | Requires code annotations                     | Python package     | ❌ No real-time (post-run results)   | MIT License (Free)    | [GitHub Repo](https://github.com/lfwa/carbontracker) | Good for ML workflows in HPC |
| **CodeCarbon**                   | Hardware-level (GPU + CPU + RAM) + regional carbon intensity     | Online/Offline tracking supported                   | Requires experiment setup                      | Python package     | 📊 Dashboard after execution       | Free                   | [GitHub Repo](https://github.com/mlco2/codecarbon) | Supports regional carbon intensity |
| **Eco2AI**                       | Function-level CPU/GPU + region-based emission coefficient      | Most platforms                                      | Requires experiment setup                      | Python package     | ❌ No real-time (post-run results)   | Apache 2.0 (Free)    | [GitHub Repo](https://github.com/sb-ai-lab/Eco2AI) | Similar to CodeCarbon, with function-level insights |
| **experiment-impact-tracker**    | Function-level measurement                                       | Linux, MacOS (Nvidia GPU & Intel CPU)              | Requires code instrumentation                  | Python package     | ❌ No real-time (post-run results)   | Free                   | [GitHub Repo](https://github.com/Breakend/experiment-impact-tracker) | Best for tracking on HPC clusters |
| **Powermeter**                   | GPU-level (Nvidia-only)                                         | Nvidia GPUs                                        | Requires code instrumentation                  | Python package     | ❌ No real-time (post-run results)   | Free                   | *(GitHub repo not well maintained)*   | Focused purely on Nvidia GPU tracking |
| **PyJoules**                     | Machine-level monitoring                                        | Linux-only (no MacOS support)                      | Requires code instrumentation                  | Python package     | ❌ No real-time (post-run results)   | MIT License (Free)    | [GitHub Repo](https://github.com/powerapi-ng/pyJoules) | Good for system-wide tracking |
| **Tracarbon**                    | Device-level CPU/GPU + region-based emission                   | Mac, Linux, AWS                                    | Requires code instrumentation                  | Python package     | ❌ No real-time (post-run results)   | Apache 2.0 (Free)    | *(GitHub repo available, active dev.)* | Good for Mac & AWS |
| **Zeus**                         | Function-level measurement + optimization                      | Not specified                                      | Requires code instrumentation                  | Python package     | ❌ No real-time (post-run results)   | Apache 2.0 (Free)    | *(GitHub repo available)*              | Offers additional energy optimizations |

---

## 🎯 **Which Tool Should You Choose?**
- **✅ For real-time monitoring:**  
  - *CentML DeepView* (best for VSCode users, interactive UI)  
- **🖥️ If you need CPU energy tracking:**  
  - *AIPowerMeter* (Intel CPU), *PyJoules*  
- **⚡ If you want region-based emissions tracking:**  
  - *CodeCarbon*, *Eco2AI*, *Tracarbon*  
- **🖥️ If you're running on HPC / Nvidia GPUs:**  
  - *CarbonTracker*, *experiment-impact-tracker*, *Powermeter*  
- **🔍 For GPU-only tracking:**  
  - *Powermeter* (Nvidia-only), *Zeus*  

---

## 🌱 **Final Thoughts**
Tracking energy consumption and carbon footprint in AI/ML workloads is becoming **increasingly important** for:
- **Sustainability & Green AI initiatives**
- **Cost-effective resource management**
- **Improved algorithmic efficiency & optimization**
- **Transparency & compliance with sustainability goals**

Researchers, engineers, and businesses can actively monitor and even reduce the carbon impact of AI using , while making their models more efficient and cost-effective.
