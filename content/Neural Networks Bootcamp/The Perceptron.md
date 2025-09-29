---
title: The Perceptron
tags:
  - NeuralNetwork
draft: true
---
# Neurons and the Human Brain vs Artificial Neural Networks
## Introduction
- Human brain = billions of interconnected neurons.  
- Each neuron passes messages to others → produces an action.  
- Example: reaching your pocket for your wallet.  

---

## Biological Neurons
- **Inputs:** received by dendrites.  
- If input is important → neuron fires.  
- If not → neuron stays inactive.  
- **Output:** when fired, sends electrical signals via axons (boutons) to other neurons.  
- This network of firings allows actions, thoughts, and memory.  

---

## Brain as Inspiration
- Artificial Neural Networks (ANNs) mimic the brain mathematically.  
- Biological processes are modeled in a simplified way.  
- Brain storage capacity: ~2.5 **petabytes** (equivalent to 300+ years of nonstop TV).  

---

## Mapping Biological to Artificial
- **Dendrites → Inputs (features)**  
- **Weights → Importance of features**  
- **Neuron → Processing unit**  
- **Activation function → Determines if neuron fires**  
- **Axons → Outputs to other neurons**  

### Process
1. Inputs × Weights  
2. Sum them up  
3. Pass through activation function (e.g., **Sigmoid**)  
4. Output goes to other neurons  

---

## Mathematical Model of a Neuron
- Equation:  
  \[
  z = (x_1 \cdot w_1) + (x_2 \cdot w_2) + (x_3 \cdot w_3) + b
  \]

- **Bias (b):**  
  - Extra adjustable parameter.  
  - Helps neuron fire when inputs alone are insufficient.  

- **Activation (Sigmoid):**  
  \[
  \sigma(z) = \frac{1}{1 + e^{-z}}
  \]  
  - Squashes output to range [0, 1].  
  - Output determines if neuron fires.  

---

## Perceptron
- Simplest form of ANN.  
- Separates inputs using a straight line (linear boundary).  

### Example
- Inputs & weights → linear equation (like \( y = mx + c \)).  
- Can classify between two classes (C1 vs C2).  

---

## Logic Gates with Perceptron
- **AND Gate:** Works → linearly separable.  
- **OR Gate:** Works → linearly separable.  
- **XOR Gate:** Fails → not linearly separable.  

---

## Limitation → XOR Problem
- XOR outputs cannot be separated with a straight line.  
- Requires **non-linear boundaries**.  

---

## Multilayer Perceptron (MLP)
- Solution to XOR problem.  
- Adds **hidden layers** between input & output.  
- Each hidden layer processes inputs further.  
- Forms the basis of **deep learning**.  

---

## Deep Neural Networks (DNNs)
- Just an MLP with multiple hidden layers.  
- Structure:  
  - **Input layer → Hidden layers → Output layer**  
  - Hidden layers: many neurons, multiple transformations.  
  - Output neurons = number of classes (e.g., 4 neurons for cat, dog, bird, cow classification).  

---

## Key Takeaways
- Biological neuron structure inspired ANN design.  
- ANN = inputs, weights, summation, activation → output.  
- Perceptron works for linearly separable problems.  
- XOR problem → led to invention of **MLP**.  
- Deep Neural Networks = extension of MLP with many layers.  
