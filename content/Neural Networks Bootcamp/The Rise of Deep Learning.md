---
title: The Rise of Deep Learning
tags:
  - NeuralNetwork
draft: true
---
# The Rise of Deep Learning

## Early Development
- Neural networks were developed in the 1990s.
  - **LSTM (Long Short-Term Memory)** → 1997.  
  - **CNN (Convolutional Neural Networks)** → 1998.  
- Despite being around for years, **deep learning only became popular in 2012**.  

---

## Why Did Deep Learning Become Popular in 2012?

### **1. Availability of Large Datasets**
- `Deep learning requires big datasets to work effectively`.  
- Example: **ImageNet** → database of `1M+ images across 1000 classes`.  
- With large datasets becoming available, models could be trained at scale.  
- Today, new datasets are released almost every year.  

### **2. Computational Resources (GPUs)**
- `Training on CPUs is too slow` (days or weeks).  
- GPUs made it possible to train in `hours or minutes`.  
- Example: Training an object detection model:
  - On CPU → days.  
  - On GPU → ~12 minutes per epoch.  

### **3. Matrix Multiplication on GPUs**
- Neural networks are essentially `a series of matrix multiplications`.  
- GPUs, originally designed for graphics, were adapted to run these efficiently.  
- Libraries like **CUDA** and **cuDNN** (by NVIDIA) provided:
  - Optimized routines for forward/backward propagation.  
  - Convolution, pooling, RNNs, and more.  

---

## Breakthrough Paper (2012)
- **ImageNet Classification with Deep CNNs (AlexNet)** – University of Toronto.  
- Innovations:
  - Deployed deep CNNs on GPUs.  
  - Split the network across **two GPUs** for faster training.  
  - Outperformed traditional methods like **SVMs** (Support Vector Machines).  
- Won the **ImageNet Competition (2012)** – considered the “World Cup of Computer Vision.”  
- Marked the true beginning of modern deep learning.  

---

## Key Takeaways
- **Early work** existed since the 90s (LSTMs, CNNs).  
- **2012 was the turning point** → datasets, GPUs, and optimized libraries converged.  
- Breakthrough research (AlexNet) proved deep learning could outperform traditional ML methods.  
- Sparked the **rise of deep learning**, which now dominates computer vision, NLP, and beyond.  
