﻿# Collectibles4Us
 
 
 3/16/2023
 ISSUE FOUND
  Incorrect Hashing method
  Corrected the use of the hashing method used in both the new user and sign in php files. I found that I was
  getting a different hash output every time with the same input, which of course is not help. Updated the
  hashing method to use just hash instead of password_hash which seems to make it work. Will make sure to add 
  a message on my commit later today.
