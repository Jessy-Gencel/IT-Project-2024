Documentation
=============
Using Sphinx for documentation
------------------------------
This guide will help you get started with Sphinx to document your Python projects.

Install sphinx
--------------

- To install Sphinx and the Read the Docs theme, run the following commands:

.. code-block:: bash 

    pip install sphinx
    pip install sphinx-rtd-theme
    
- To verify your installation, run:

.. code-block:: bash 

    sphinx-build --version
    

Start documenting
-----------------

- **Create an `.rst` file in `docs/source`:**
    - example: installation.rst
- **Update `index.rst` to include your new file:**
    - Add your file to the `.. toctree::` directive in `index.rst`. Example: 

.. code-block:: bash 

    .. toctree::
   :maxdepth: 2
   :caption: Contents:

   api
   installation
   documentation
   ... (add your file here)

Start building your documentation
---------------------------------
- Use the following example as a guide for structuring your `.rst` files. You can also refer to existing `.rst` files for consistency:

.. code-block:: bash

    Title
    =====

    Module1
    -------
    - Feature 1
        - Sub-feature 1
    - Feature 2
    ModuleWithLongerName
    --------------------
    - Step A
    - Step B

    .. code-block:: bash (used to display code blocks)
        (make sure to leave a blank space here or it wont work)
        # Example bash comand
        pip install sphinx