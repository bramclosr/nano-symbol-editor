# Nano Symbol Editor

## About This Project

I created this unofficial Nano Symbol Editor after noticing inconsistencies with the SVG implementation on the nano.org website. The symbols availble from nano.org appeared with minor width inconsistencies and inconsisitent angles.

You can download the symbol from the github, or modify it using the simple editor - [html preview](https://htmlpreview.github.io/?https://github.com/bramclosr/nano-symbol-editor/blob/main/index.html)

## Design Principles

This editor generates the Nano symbol based on these key principles:

- **Equilateral Triangles**: Based off equalatileral triangles, maintaining geometric harmony
- **Proportional Spacing**: All spacing between elements follows specific ratios, creating a balanced visual hierarchy
- **Precise Alignment**: Every element is carefully aligned with the base and center axis, ensuring perfect symmetry

## Editor Features

### Basic Mode

- **Chunky Style**: Easily adjust the thickness and proportion of all elements
- **Corner Radius**: Add rounded corners to the symbol elements (!CURRENTLY NOT WORKING)
- **Color Customization**: Change the fill color to match your branding
- **Clean SVG Output**: Generate minimal, optimized SVG code, perfect for websites, printing materials, and design projects

### Advanced Mode

- **X Width Adjustments**: Fine-tune inner and outer points independently
- **Horizontal Bar Dimension Controls**: Precisely modify width, thickness, and height of box elements
- **Individual Point Manipulation**: Adjust specific points for custom variations
- **Point Visualization**: Option to display point numbers for precision editing

## Known Limitations

Please be aware of these current issues:

- **Mode Switching Bug**: Switching from basic to advanced settings after making changes can cause conflicts. If you encounter issues, reload the page before continuing.
- **Compatibility Issues**: Some combinations of features may produce unexpected results:
  - Rounded edges may conflict with certain other modifications
  - Extreme value combinations can distort the symbol's proportions
  
## Future Improvements

I may address these limitations in future updates if requested. Contributions and suggestions are welcome!

## License

This is an unofficial tool and is not affiliated with the Nano Foundation or nano.org. 

---

*If you find this tool useful, consider encouraging further development with a tiny tip!*
