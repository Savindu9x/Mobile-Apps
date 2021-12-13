 # TapCode-reader
 
 An app that is capable of sending messages using a tap-code over short distances. Tap-codes are convenient forms of communication as there are only two states meaning there is less opportunity for confusion.

 A tap code is a way of encoding text with sequences of taps. Each element has two sequences, the first gives the row number and the second gives the column number in the corresponding matrix.

 First, App will retrieve the image data from a live video stream from the phone which corresponds to 20x20 pixel area which then needs to be converted into greyscale values. This function will be called every 20ms with a new array of pixels which could correspond to part of a tap or part of a gap to discover the encoded message using timestamps. 

![ss](https://user-images.githubusercontent.com/75357109/145668936-d5f0708b-dc7a-4ff7-aab4-0c363105c00b.jpg)
