#  Change youtube playback speed chrome extension

## Description

Chrome extension that enables changing YouTube video playback speed from 0 to 10 with a custom step.

The controls are integrated with the YouTube player in the form of: 
- a draggable bar below the quality option in the player settings

![controls1](https://lh3.googleusercontent.com/aDtsVrwoZ-cDivKET8u9Iw-_FJBoayM03zj0OlNlTcxhEkirRzvmbTqegxr6b1vhmuNE1E6Iz747gPyl16Ow44RQPg=s800-w500-h350)

- by detecting pressed keys provided by the user (by default '-' or 'a' to subtract and '+' or 'd' to add).

![controls2](https://lh3.googleusercontent.com/WrtgqXJyNfFFdaV_J8T_qNksrVxM_ncAJpR8WNypcyNl5NMWlJVOQWeU_m_vksH53-r-vcBUCHMdKqlpvHacmTDa=s1280-w500-h350)

Keys and step value can be easily modified in a settings window:

![settings_page](https://lh3.googleusercontent.com/pUinTB9hkn2GuWLarWvKnTKtvyp2kq3qkcZghraNiZbKHTx5Lj-xC96Bm9IDkamZgJ4qP2IwacerVhGRBANvD_3P=s1280-w500-h350)

### Usage presentation (click to open youtube video)
[![usage presentation - video](https://github.com/MarekNowak250/Change-youtube-playback-speed-chrome-extension/assets/99994906/57796353-a8bc-4a5e-99fb-804684911a9a){width=500 height=350}](https://www.youtube.com/watch?v=CWnXMyYBkUA "Usage presentation")

### New dynamic playback speed control in version 1.6.0!

The feature of dynamic video playback speed enables the playback speed to begin at a specified rate and then gradually increase until it reaches the desired rate at the specified duration percentage.

E.g. the video starts at 1x speed and gradually increases based on the video duration until it reaches 50%, at which point it will reach 3x speed.

![dynamic speed control closed](https://gitlab.com/Phoenix510/change-youtube-playback-speed-chrome-extension/-/wikis/uploads/c14a333e77832869c0975ddef98b278f/1.png){width=320}

![dynamic speed control open](https://gitlab.com/Phoenix510/change-youtube-playback-speed-chrome-extension/-/wikis/uploads/58a2dddf436f5e5cf3058bfd922cd45b/image.png){width=320}

**Remember to enable it in a settings!**
![dynamic speed control open](https://gitlab.com/Phoenix510/change-youtube-playback-speed-chrome-extension/-/wikis/uploads/accf4059e57fa2c0e819883febbde2cb/image.png){width:320}

## Why?

YouTube allows users to adjust playback speed from 0.25x to 2x with a 0.25 step increment (+ some additional control with key bindings, but still up to 2x).
This extension was designed to provide users with greater control over video playback speed and enhanced comfort through customizable key press bindings.

## Quick start

- Install extension directly from [chrome extension store](https://chromewebstore.google.com/detail/custom-youtube-playback-s/mlnghacnjjppjfbbjbpkgcemiaglbpii)

- Download source code and unpack it. Then, open the Chrome browser and click on the three dots in the top right corner. Then, click on Extensions and select Manage extensions. Turn on developer mode and click on "load unpacked." Choose the folder with the source code and make sure the extension is active by checking the switch.

## Contributing

If you wish to make a contribution, please fork the repository and create a pull request for the `main` branch.
