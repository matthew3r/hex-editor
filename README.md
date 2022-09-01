# hex-editor for the fiskaly React challenge

## From the challenge description:

> ## Instructions
> Create a Hex viewer component (see src/components/HexViewer.tsx). Basically a Hex editor without the ability to change its content.
> 
> - The component can retrieve either a string or Uint8Array.
> - The Hex viewer must be responsive and each part of the line must match (hex value must match with the text value line by line).
> - The component must be able to display the bytes as hex and readable text side by side.
> - Non-readable characters should be replaced with a special character.
> - 
> Optional features:
> - It would be nice to be able to select one part of the hex viewer and automatically the other part gets highlighted as well.
> - The possibility to then copy the selected hex value or text (depending on what was selected) would be nice as well.
> - Add the ability to display Uint16Array and ArrayBuffer.

---

## Result

The application knows all the required points and except the last one it knows the optionals also.

For future improvements:
- The current design is really simple and not good looking. It can be highly improved.
- Because of the sites structure the responsive part is rudimentary. There is a lot of room to make this better and more usable.
- First, while selecting the data, all of the page was rerendered, and that I was able to improve to rerender only the hex and raw part of the site. But when there is a bigger data the selection can be a little laggy. The app can be improved to only rerender those datas which are selected or deselected.
- The last optional feature, to display Uint16Array and ArrayBuffer.
- When copying the raw values it copies the replaced characters instead of the original ones.

![Screenshot](/hex/public/screen.png)
