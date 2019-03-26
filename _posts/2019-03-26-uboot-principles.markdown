---
layout: post
title:  "Uboot Design Principles: 10 Gloden Rules"
date:   2019-03-26 11:30:00 +0800
author: "Alex"
tags: 
    - U-Boot

---

# U-Boot Design Principles:The 10 Gloden Rules of U-Boot design

1. Keep it Small
    * U-Boot is a Boot Loader
    * Nor flash is more expensive
2. Keep it Fast
    * The end user is not intereted in runing U-Boot
    * Principles
        * Enable caches as soon and whenever possible
        * Initialize devices only when they are needed within U-Boot
3. Keep it Simple
    * It is a boot loader
    * It is also a tool used for board bring-up, for production testing, and for other activities
4. Keep it Portable
    * Related to hardware developments
    * Avoid assembly language whenever possible
    * Don't make assumptions over the evironment where U-Boot is running
5. Keep it Configurable
    * Keep it Small
    * U-Boot is a powerful tool with many, many extremely useful features
    * Make sure that is easy to add and remove features from a board configration
6. Keep it Debuggable
    * Enable output to the console
    * "doing" & "done" tips
    * JTAG
7. Keep it Usable
    * End user: just wants to run some applications
    * System designers: want a powerful tool, want it fast and scriptable and whatever
    * Enegineer who ports U-Boot to a new board
    * Make it easy to test
    * Add debug code: don't re-invent the wheel, using existing macros like debug() or debugX()
8. Keep it Maintainable
    * Avoid #ifdefs where possible
    * Use "weak" functions
    * Always follow the Coding Style requirements
9. Keep it Beautiful
    * Keep the source code clean
    * Keep U-Boot console output clean
    * Keep output vertically aligned, do not use control character sequences
10. Keep it Open
    * Contribute your work back to the whole community
