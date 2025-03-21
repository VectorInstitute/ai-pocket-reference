# Quantization

{{ #aipr_header }}

## 1. Introduction to Quantization

Quantization reduces the numerical precision of the weights and activations of
a neural network from a high-precision datatype to a lower-precision datatype.
The standard datatype for neural network weights and activations is fp32 (float32),
but quantization methods enable use of lower-precision representations, most commonly
8-bit integers (int8) and 16-bit floats (float16 or bfloat16). Even 4-bit integers
see use. Think of it like compressing a high-definition image into a
lower-resolution format – you lose some detail, but gain efficiency.

**Why Quantization?**

* **Lower Memory Requirements:** Reduced bit-depth directly translates to smaller
model memory footprint, saving memory capacity and bandwidth during model storage
and inference. This also makes it feasible to deploy larger, more performant models
on resource-constrained devices.
* **Faster Throughput:** Lower precision is significantly faster and more energy-efficient
on modern hardware. Modern GPUs with tensor cores (like NVIDIA's Ampere and Hopper
architectures) can perform low and mixed-precision matrix multiplications with
significantly higher throughput than FP32.

## 2. How Quantization Works

This mapping is typically done using *affine quantization* or *symmetric quantization*.
For example, an affine quantization from fp32 to int8 involves two parameters for
each tensor being quantized:

* **Scale (S):** A positive floating-point number that determines the step size
between quantized integer values. It essentially scales the integer range back
to the floating-point range.
* **Zero-point (Z):** An integer that represents the floating-point value 0 in
the quantized integer space. This is important for accurately representing zero
values, which are common in neural networks (e.g., after ReLU activations).

The relationship between a floating-point value (\\(x\\)) and its quantized
integer representation (\\(x_q\\)) is defined by:

$$x = S (x_q - Z).$$

To quantize a float value \\(x\\) to its integer representation \\(x_q\\), we solve:

$$x_q = \text{round}\left(\frac{x}{S} + Z\right).$$

Values outside the representable range of the target type
(e.g., [-128, 127] for int8) are typically clipped to the nearest representable
value. Symmetric quantization is a simplified version where the zero-point (Z)
is forced to be 0. This is achieved by choosing a symmetric range around zero
for quantization (e.g., [-max_abs_value, +max_abs_value]).

## 3. Types of Quantization & Calibration

To quantize a model, we need not only quantize the tensors holding the weights,
but also the tensors holding the activations — otherwise the computation mix
data types. There are different quantization approaches, each with its
trade-offs in terms of performance, and implementation complexity.

In all cases, we need to determine
the range of values for the weights and activations. This is known as *calibration*.
Calibrating weights is straightforward, because they are static, but calibrating
activations is more challenging because they are data dependent:

* **Dynamic Quantization**
  * **How it works:** Weights are quantized when loading the model. Activations
  are quantized *dynamically* just before compute operations and de-quantized back
  to high-precision afterwards.
  * **Pros:** Easiest to implement and reduces model weight memory footprint.
  * **Cons:** Activations are still stored and passed between layers in
  high-precision format, limiting memory bandwidth and throughput benefits.

* **Static Quantization**
  * **How it works:** Both weights and activations are quantized. *Static*
  quantization requires a calibration step to determine the ranges for activation
  tensors. This is done by running a representative dataset through the
  high-precision model to collect activation statistics and compute the activation
  ranges. These statistics are then used to calculate the (S, Z) parameters
  *before* run-time.
  * **Pros:** Better throughput than dynamic quantization as both weights and
  activations are quantized.
  * **Cons:** Requires collection of a calibration dataset and offline
  calibration step.

## 4. Limitations and Considerations

* **Performance Degradation:** Quantization, especially to very low-precision
datatypes, can lead to some loss of performance. Careful evaluation is needed
for peformance-sensitive applications.
* **Hardware and Operator Support:** Quantization support is not universal.
It depends on the target hardware and the deep learning framework. Not all operators
might have efficient quantized implementations on all platforms. Make sure to verify
your framework and hardware documentation for compatibility.

#### References & Useful Links <!-- markdownlint-disable-line MD001 -->

1. [Jacob, Benoit, et al. "Quantization and training of
neural networks for efficient integer-arithmetic-only inference", CVPR 2018](https://arxiv.org/abs/1712.05877)
2. [PyTorch Quantization Documentation](https://pytorch.org/docs/stable/quantization.html)

<!-- markdownlint-disable-file MD033 -->

{{#author jwilles}}
