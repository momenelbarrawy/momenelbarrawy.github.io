---
title: The Essence of Neural Networks
tags:
  - NeuralNetwork
draft: true
---

## Introduction
- Before diving into forward and backpropagation, we need to understand the core idea of neural networks.  
- The example used: predicting whether you pass or fail an exam.

---

## Problem Setup
- **Output (y):**
  - `0` → Fail the exam  
  - `1` → Pass the exam  

- **Inputs (x):**
  - X1: How much you study  
  - X2: How smart you are  
  - X3: Your previous knowledge  
  - X4: Your name  

- Some inputs influence the prediction, others don’t.  
  - **Important:** Study time, intelligence, previous knowledge  
  - **Not important:** Name  

---

## Assigning Importance (Weights)
- Neural networks assign **weights** to inputs based on importance.  
- Example weighting:
  - X1 (study time): `1.0` (most important)  
  - X2 (intelligence): `0.5`  
  - X3 (previous knowledge): `0.2`  
  - X4 (name): `0.0` (ignored)  

- Formula:  
  \[
  y = (x_1 \times w_1) + (x_2 \times w_2) + (x_3 \times w_3) + (x_4 \times w_4)
  \]

- **Weights represent what the neuron “cares about.”**

---

## Neuron Concept
- The **neuron** is the simplest unit of a neural network.  
- It:
  1. Takes inputs  
  2. Multiplies them by their weights  
  3. Adds them together  
  4. Produces an output  

- Example:  
  - Inputs × Weights → Sum = `2.8`

---

## Activation Function (Threshold)
- The sum of weighted inputs is passed through an **activation function**.  
- Purpose: Decide the final output (yes/no, pass/fail).  

- **Threshold function (simplest case):**
  - If output ≥ 1 → Prediction = `1` (Pass)  
  - If output < 1 → Prediction = `0` (Fail)  

- Example:  
  - Weighted sum = `2.8` → ≥ 1 → Output = `1` → Prediction: Pass  

---

## Key Takeaways
- Inputs are weighted to show their importance.  
- Neurons calculate a weighted sum of inputs.  
- An activation function turns this into a clear output.  
- **Essence of neural networks = Inputs + Weights + Activation.**

---

## Next Steps
- Next videos will cover:
  - Detailed neuron structure  
  - Activation functions (ReLU, Sigmoid, etc.)  
  - Forward and backpropagation
