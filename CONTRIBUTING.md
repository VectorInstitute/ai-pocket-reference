# Contributing to AI Pocket Reference

Thank you for your interest in contributing to the AI Pocket Reference project!
This document provides guidelines and instructions for contributing.

## Contributor Notice

By contributing to the AI Pocket References collection, you agree to release your
contributions under the Creative Commons Zero (CC0) 1.0 Universal license. This
means:

- You waive all copyright and related rights to your contributions
- Your work becomes part of the public domain
- Others can freely use, modify, and distribute the content without attribution requirements

While attribution is not legally required under CC0, we maintain a record of
contributions through:

- Git history
- Contributor listings on pocket reference pages
- Community discussions and interactions

## Types of Contributions

You can contribute to the AI Pocket Reference project in several ways:

1. **Write a New Pocket Reference**

   - Create a new reference for an uncovered AI topic
   - Follow our format and style guidelines
   - Ensure content is concise and accessible

2. **Improve Existing Content**

   - Suggest improvements to existing pocket references
   - Fix errors or typos
   - Update outdated information
   - Add relevant examples or clarifications
     Note: Only substantial edits (as determined during the review process) will
     result in addition to the contributor list. Minor edits such as typo fixes,
     while valuable, are tracked through git history.

3. **Request New Topics**
   - [Submit an issue](https://github.com/VectorInstitute/ai-pocket-reference/issues/new/choose)
     suggesting new topics (be sure to first check our
     [Project Board](https://github.com/orgs/VectorInstitute/projects/7) to see
     planned and in-progress topics)
   - Provide context for why the topic would be valuable
   - Include potential references or resources

## Getting Started

1. **Fork the Repository**

   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/ai-pocket-reference.git
   cd ai-pocket-reference
   ```

2. **Install `mdbook` and Required Preprocessors**

   ```bash
   # Install mdbook and required preprocessors
   cargo install mdbook
   cargo install mdbook-ai-pocket-reference    # For aipr preprocessors
   cargo install mdbook-github-authors  # For tracking contributors
   ```

3. **Install `pre-commit`**

   ```bash
   # Install and set up pre-commit hooks
   pip install pre-commit
   pre-commit install
   ```

   The pre-commit hooks help maintain consistent code quality across contributions
   by:

   - Using markdownlint to ensure markdown files are formatted consistently
   - Running codespell to catch and prevent spelling errors

   These checks run automatically before each commit to maintain the quality of
   our pocket references.

4. **Make Your Changes**

   The AI Pocket Reference is organized as a collection of mdBooks, with separate
   books for different areas of AI. The available books are:

   - `books/fundamentals` - Core AI/ML concepts and foundations
   - `books/cv` - Computer Vision
   - `books/nlp` - Natural Language Processing
   - `books/rl` - Reinforcement Learning
   - `books/fl` - Federated Learning
   - `books/responsible_ai` - Responsible AI and Ethics

   When making changes, you'll need to work with the appropriate book for your topic.

   - Build and test locally (make sure you're in the project root directory):

     ```bash
     # From the project root directory (ai-pocket-reference/),
     # watch and automatically open the book in your browser
     mdbook watch books/<book-name> --open

     # For example, to work on the NLP book:
     mdbook watch books/nlp --open
     ```

   - Make sure you're working with the correct book for your contribution
   - Commit your changes with clear commit messages

## Style Guide

### Format Requirements

- Keep content concise (7 minutes reading time maximum)
- Use clear, accessible language
- Include links to further reading
- Add diagrams or code examples where appropriate

### Structure

Each pocket reference should include:

1. Clear introduction of the concept
2. Core explanation with key points
3. Practical examples or applications
4. Links to further reading
5. Contributors section at the bottom

### Including Code In Pocket References

There are two ways to include code in your pocket reference:

1. **Code Snippets in Pocket References**

   - Use markdown code blocks with appropriate language tags
   - Keep snippets focused and concise
   - Include comments to explain key concepts

2. **Supplementary Jupyter Notebooks**

   - Submit notebooks to our [supplementary code repository](https://github.com/VectorInstitute/ai-pocket-reference-code)
   - Use for detailed implementations, tutorials, or extended examples
   - Reference these notebooks from your pocket reference using the helper
     `{{#colab <book>/<notebook-title>.ipynb}}`

     > [!NOTE]
     > Ensure that you're notebook has been successfully merged into the supplementary
     > code Github repository. Otherwise, the Google colab link will not work.

Choose the appropriate method based on your needs:

- Use code snippets for quick, focused examples directly in the text
- Use Jupyter notebooks for comprehensive implementations or interactive tutorials

### Writing Style

- Use simple, direct language
- Define technical terms when first used
- Link to existing pocket references rather than re-explaining concepts
- Use examples to illustrate concepts

## Questions and Support

Join our Discord community and ask your questions in the #ai-pocket-reference
channel. This is the best place to get help with your contributions and connect
with other contributors.

## Using mdBook Preprocessors

We use several mdBook preprocessors to enhance our pocket references:

- [mdbook-ai-pocket-reference](https://github.com/VectorInstitute/mdbook-ai-pocket-reference)
  — for adding default headers and footers to each pocket reference
- [mdbook-github-authors](https://github.com/VectorInstitute/mdbook-github-authors)
  — for listing Contributors of a pocket reference

### Adding the AI Pocket Reference Header

To add the default header to your pocket reference, you can need to use the
`{{ #aipr_header }}` helper. This helper should be placed immediately after
the title section.

```markdown
# My Pocket Reference

{{ #aipr_header }}

... rest of the pocket reference
```

The default header includes a Github badge that links to issue submission for the
repository as well as a calculated reading time.

If your pocket reference has an associated notebook that lives in
[ai-pocket-reference-code](https://github.com/VectorInstitute/ai-pocket-reference-code),
then you can specify the `colab` option of the helper in order to bring in the
Google colab badge that points to your notebook.

```markdown
# My Pocket Reference

{{ #aipr_header colab=nlp/lora.ipynb }}

... rest of the pocket reference
```

In the example above, a Google Colab badge would be added to the header that
links to the notebook found in the supplementary code repo at
[notebooks/nlp/lora.ipynb](https://github.com/VectorInstitute/ai-pocket-reference-code/blob/main/notebooks/nlp/lora.ipynb).

### Adding Contributors

You need to use either of these helpers in your markdown file. Note the exact
location of these, and you can have multiple helpers in a single file, does not
matter. The contributor section will always get added to the bottom of the pocket
reference.

For a single author:

```markdown
{{#author github-username}}
```

For multiple authors:

```markdown
{{#authors username1,username2,username3}}
```

These will automatically:

- Track contributions
- Display GitHub profile information

## Recognition

Contributors are recognized on each pocket reference page they create or
substantially modify. This voluntary attribution helps:

- Track the evolution of content
- Foster community engagement
- Provide points of contact for questions or feedback
- Acknowledge the collaborative nature of the project

When a pocket reference evolves through multiple contributors:

- The original author is listed as the primary contributor
- Subsequent contributors who make substantial modifications are also listed
- All contributions are tracked in git history

---

Thank you for helping make AI knowledge more accessible to everyone!
