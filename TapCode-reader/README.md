 # TapCode-reader
 
   An app that is capable of sending messages using a tap-code over short distances. Tap-codes are convenient forms of communication as there are only two states meaning there is less opportunity for confusion. A tap code is a way of encoding text with sequences of taps. Each element has two sequences, the first gives the row number and the second gives the column number in the corresponding matrix.
 
 |   | 1 | 2 | 3 | 4 | 5 |
 | - | - | - | - | - | - |
 | 1 | e | t | a | n | d |
 | 2 | o | i | r | u | c | 
 | 3 | s | h | m | f | p | 
 | 4 | l | y | g | v | j | 
 | 5 | w | b | x | q | z | 
  
 
First, Transmitter App will encode the message by converting words to tap code.  Then, App will retrieve the image data from a live video stream from the phone which corresponds to 20x20 pixel area which then needs to be converted into greyscale values. This function will be called every 20ms with a new array of pixels which could correspond to part of a tap or part of a gap to discover the encoded message using timestamps. 
 
![ss2](https://user-images.githubusercontent.com/75357109/145859603-56971c50-3600-4dff-b8de-1f81cbbe2bdf.jpg)

This code runs and displays a screen with a camera feed and area for the encoded message (“rx-code”) and decoded message (“rx-translated”). It further includes a button to clear the current code (an X), to reload the camera image (see menu top right) in case the camera goes to sleep, and record/stop recording button (an eye) which starts and stops the triggering of the _listen function.

![ss](https://user-images.githubusercontent.com/75357109/145859825-2bc33d6e-073a-41b9-b0af-6516e1fcde4e.jpg)
