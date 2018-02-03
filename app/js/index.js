function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

var red = '#AA3C3A'
var orange = '#FFC855'
var black = '#2A2A2A'
var blue = '#7379D4'
var green = '#488B45'
var purple = '#7b1fa2'
var white = '#fafafa'

var gameContainer = document.getElementById('gameContainer')

var titleText = document.createElement('div')
titleText.setAttribute('class', 'title')
titleText.innerHTML = 'Lighthouse'
var prContainer = document.createElement('div')
prContainer.setAttribute('class', 'promptContainer')

var prAppend = document.createElement('div')
prAppend.setAttribute('class', 'promptTitle')

var prName = document.createElement('div')
prName.setAttribute('class', 'prName prName-david')
var prNameText = document.createTextNode('David:')

var hidden = document.querySelector('.hidden')
gameContainer.appendChild(prContainer)

gameContainer.appendChild(titleText)

var promptDrop = document.createElement('div')
promptDrop.setAttribute('class', 'promptDrop')
var promptDropAnimation = document.querySelector('.promptDropAnimation')

promptDrop.appendChild(promptDropAnimation)

var continueButton = document.createElement('IMG')

var button1 = document.createElement('button')
var button2 = document.createElement('button')

function addContinue() {
  continueButton.setAttribute('class', 'continue')
  continueButton.setAttribute('src', '../images/continue.svg')
  gameContainer.appendChild(continueButton)
}

function addButtons(t, cycle, etc) {
  button1.setAttribute('class', 'button button1')
  button2.setAttribute('class', 'button button2')
  button1.innerHTML = cycle.choice.a
  button2.innerHTML = cycle.choice.b
  if (etc === true) {
    promptDrop.appendChild(button1)
    promptDrop.appendChild(button2)
  } else {
    gameContainer.appendChild(button1)
    gameContainer.appendChild(button2)
  }
}

var homeAnim
homeAnim = document.querySelector('.animation-home')
addClass(homeAnim, 'show')
// create variables for the animations need adding
// or include them by turning their display value.
gameContainer.appendChild(homeAnim)

function addAnimation(animation) {
  document.createElement('button')
  animation.setAttribute('class', 'full')
  gameContainer.appendChild(animation)
}

var startButton = document.createElement('button')
startButton.setAttribute('class', 'startButton buttonAnimation')
var buttonText = document.createTextNode('Start Game')
startButton.appendChild(buttonText)
gameContainer.appendChild(startButton)

var firstAnim
firstAnim = document.querySelector('.animation-firstScene')

var promptPrint = function(promptInput, etc) {
  prAppend.innerHTML = ' '
  prContainer.innerHTML = ' '
  removeClass(prAppend, 'proTitleAnim')
  var pText = document.createTextNode(`${promptInput}`)

  if (etc === true) {
    prAppend.appendChild(pText)
    promptDrop.appendChild(prAppend)
    gameContainer.appendChild(promptDrop)
    addClass(promptDrop, 'showPrompt')
    addClass(promptDropAnimation, 'promptDropAnimationPlus')
  } else {
    prAppend.appendChild(pText)
    prContainer.appendChild(prAppend)
    addClass(prAppend, 'proTitleAnim')
  }
  // removeClass(prAppend, 'proTitleAnim');
}

function click(t) {
  var current = -1
  var nextPrompt = 1
  var cycle = t[current + nextPrompt]

  if (cycle.read) {
    promptPrint(cycle.read[0])
    if (cycle.anim) {
      addClass(prAppend, 'fade')
      prAppend.style.textAlign = 'center'

      // mark
      setTimeout(function() {
        gameContainer.style.webkitAnimationPlayState = 'paused'
        gameContainer.style.animation = 'colorFlux none 0'
        gameContainer.style.backgroundColor = green
        addClass(firstAnim, 'show')
        gameContainer.appendChild(firstAnim)
        addContinue()
      }, 9000)
    }
  } else if (cycle.read == null) {
    // promptPrint(cycle.read[1]);
    // this might screw everything
    if (cycle.anim) {
      addClass(prAppend, 'fade')
      prAppend.style.textAlign = 'center'
      // var firstAnim;
      // firstAnim = document.querySelector(".animation-firstScene");
      // addClass(firstAnim, 'show');
      // gameContainer.appendChild(firstAnim);
    }
  } else {
    // mark
    promptPrint(cycle)
  }

  current = 0
  startButton.remove()

  hidden.onclick = function() {
    removeClass(prAppend, 'fade')
    var cycle = t[current + nextPrompt]
    nextPrompt += 1

    if (cycle.prompt) {
      promptPrint(cycle.prompt, true)
      addButtons(t, cycle, true)

      button1.onclick = function() {
        removeClass(promptDrop, 'showPrompt')
        addClass(promptDrop, 'hidePrompt')

        setTimeout(function() {
          removeClass(promptDrop, 'hidePrompt')
          promptDrop.remove()
          removeClass(promptDropAnimation, 'promptDropAnimationPlus')
        }, 6000)

        if (cycle.choice.resA) {
          addContinue()
          var startingIndex = -1

          hidden.onclick = function() {
            var arrLength = cycle.choice.resA.length

            if (startingIndex < arrLength) {
              console.log(startingIndex)
              startingIndex = startingIndex + 1
              // promptPrint(cycle.choice.resA[startingIndex]);

              if (cycle.choice.resA[startingIndex].m) {
                prAppend.style.fontStyle = 'normal'
                prNameText.textContent = 'Melissa:'
                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                prName.setAttribute('class', 'prName prName-melissa')
                // promptPrint(cycle.choice.resA.m);
                promptPrint(Object.values(cycle.choice.resA[startingIndex]))

                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else if (cycle.choice.resA[startingIndex].internal) {
                prAppend.style.fontStyle = 'italic'
                prAppend.style.fontWeight = '300'
                prAppend.style.textAlign = 'left'
                prName.setAttribute('class', 'prName prName-internal')

                // promptPrint(cycle.internal);

                promptPrint(Object.values(cycle.choice.resA[startingIndex]))

                // there is a all-powerful override on other text styling on the ELSE below
              } else if (cycle.choice.resA[startingIndex].u) {
                prAppend.style.fontStyle = 'normal'
                prNameText.textContent = 'Unknown:'
                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                prName.setAttribute('class', 'prName prName-unknown')
                promptPrint(Object.values(cycle.choice.resA[startingIndex]))

                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else if (cycle.choice.resA[startingIndex].d) {
                prName.setAttribute('class', 'prName prName-david')
                prNameText.textContent = 'David:'

                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                // prContainer.insertBefore(prName, prContainer.childNodes[0]);
                prAppend.style.fontStyle = 'normal'
                promptPrint(Object.values(cycle.choice.resA[startingIndex]))
                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else if (cycle.choice.resA[startingIndex].om) {
                prName.setAttribute('class', 'prName prName-oldMan')
                prNameText.textContent = 'Old Man:'

                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                // prContainer.insertBefore(prName, prContainer.childNodes[0]);
                prAppend.style.fontStyle = 'normal'
                promptPrint(Object.values(cycle.choice.resA[startingIndex]))
                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else {
                promptPrint(Object.values(cycle.choice.resA[startingIndex]))
              }
              return startingIndex
            } else {
              // startButton.removeClass
              addClass(startButton, 'notStart')
              removeClass(startButton, 'buttonAnimation')
              startButton.innerHTML = 'proceed'
              gameContainer.appendChild(startButton)
              prContainer.innerHTML = ''
            }
          }
        }
        button1.remove()
        button2.remove()
        // hidden.click();
      }

      button2.onclick = function() {
        removeClass(promptDrop, 'showPrompt')
        addClass(promptDrop, 'hidePrompt')
        setTimeout(function() {
          removeClass(promptDrop, 'hidePrompt')
          promptDrop.remove()
        }, 6000)
        if (cycle.choice.resB) {
          // put the logic here
          addContinue()
          var startingIndex = -1
          hidden.onclick = function() {
            var arrLength = cycle.choice.resB.length

            if (startingIndex < arrLength) {
              console.log(startingIndex)
              startingIndex = startingIndex + 1
              // promptPrint(cycle.choice.resA[startingIndex]);

              if (cycle.choice.resB[startingIndex].m) {
                prAppend.style.fontStyle = 'normal'
                prNameText.textContent = 'Melissa:'
                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                prName.setAttribute('class', 'prName prName-melissa')
                // promptPrint(cycle.choice.resA.m);
                promptPrint(Object.values(cycle.choice.resB[startingIndex]))

                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else if (cycle.choice.resA[startingIndex].internal) {
                prAppend.style.fontStyle = 'italic'
                prAppend.style.fontWeight = '300'
                prAppend.style.textAlign = 'left'
                prName.setAttribute('class', 'prName prName-internal')

                // promptPrint(cycle.internal);

                promptPrint(Object.values(cycle.choice.resB[startingIndex]))

                // there is a all-powerful override on other text styling on the ELSE below
              } else if (cycle.choice.resA[startingIndex].u) {
                prAppend.style.fontStyle = 'normal'
                prNameText.textContent = 'Unknown:'
                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                prName.setAttribute('class', 'prName prName-unknown')
                promptPrint(Object.values(cycle.choice.resB[startingIndex]))

                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else if (cycle.choice.resB[startingIndex].d) {
                prName.setAttribute('class', 'prName prName-david')
                prNameText.textContent = 'David:'

                prName.appendChild(prNameText)
                prAppend.style.textAlign = 'left'

                // prContainer.insertBefore(prName, prContainer.childNodes[0]);
                prAppend.style.fontStyle = 'normal'
                promptPrint(Object.values(cycle.choice.resB[startingIndex]))
                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else if (cycle.choice.resB[startingIndex].om) {
                prName.setAttribute('class', 'prName prName-oldMan')
                prNameText.textContent = 'Old man'
                prAppend.style.textAlign = 'left'
                prAppend.style.fontStyle = 'normal'
                promptPrint(Object.values(cycle.choice.resB[startingIndex]))
                prContainer.insertBefore(prName, prContainer.childNodes[0])
              } else {
                promptPrint(Object.values(cycle.choice.resB[startingIndex]))
              }
              return startingIndex
            } else {
              addClass(startButton, 'notStart')
              removeClass(startButton, 'buttonAnimation')
              startButton.innerHTML = 'proceed'
              gameContainer.appendChild(startButton)
              prContainer.innerHTML = ''
            }
          }
        }
        button1.remove()
        button2.remove()
      }
      continueButton.remove()
    } else if (cycle.internal) {
      prAppend.style.fontStyle = 'italic'
      prAppend.style.fontWeight = '300'
      prAppend.style.textAlign = 'left'

      // promptPrint(cycle.internal);

      promptPrint(cycle.internal)
      // there is a all-powerful override on other text styling on the ELSE below
    } else if (cycle.m) {
      prAppend.style.fontStyle = 'normal'
      prNameText.textContent = 'Melissa:'
      prName.appendChild(prNameText)
      prAppend.style.textAlign = 'left'

      prName.setAttribute('class', 'prName prName-melissa')
      promptPrint(cycle.m)
      prContainer.insertBefore(prName, prContainer.childNodes[0])

      // there is a all-powerful override on other text styling on the ELSE below
    } else if (cycle.u) {
      prAppend.style.fontStyle = 'normal'
      prNameText.textContent = 'Unknown:'
      prName.appendChild(prNameText)
      prAppend.style.textAlign = 'left'

      prName.setAttribute('class', 'prName prName-unknown')
      promptPrint(cycle.u)
      prContainer.insertBefore(prName, prContainer.childNodes[0])
      // there is a all-powerful override on other text styling on the ELSE below
    } else if (cycle.d) {
      prName.setAttribute('class', 'prName prName-david')
      prNameText.textContent = 'David:'

      prName.appendChild(prNameText)
      prAppend.style.textAlign = 'left'

      // prContainer.insertBefore(prName, prContainer.childNodes[0]);
      prAppend.style.fontStyle = 'normal'
      promptPrint(cycle.d)

      prContainer.insertBefore(prName, prContainer.childNodes[0])
      // there is a all-powerful override on other text styling on the ELSE below
    } else if (cycle.om) {
      prAppend.style.fontStyle = 'normal'
      prNameText.textContent = 'Old man:'
      prName.appendChild(prNameText)
      prAppend.style.textAlign = 'left'

      prName.setAttribute('class', 'prName prName-oldMan')
      promptPrint(cycle.om)
      prContainer.insertBefore(prName, prContainer.childNodes[0])
    } else if (cycle.choice) {
      // put above hidden click res .m .d, etc here.
    } else if (cycle.transitionColor) {
      var transitionColor = cycle.transitionColor
      gameContainer.style.backgroundColor = transitionColor
    } else if (cycle == undefined) {
      continueButton.remove()
      gameContainer.appendChild(startButton)
    } else {
      prAppend.style.fontStyle = 'normal'
      promptPrint(cycle)
    }
    return nextPrompt
  }
}

////////////////////////////////////////////////////
function Game(strategy) {
  this.strategy = strategy
  this.playScene = function() {
    return this.strategy()
  }
}

function Scene() {
  this.run = function() {}

  return {}
}

// var sceneSix = function() {
//      console.log('Fourth scene logic here');
// 	 if (fourthAnim) {
// 		  fourthAnim.remove();
// 	 }
// 	 var fifthAnim;
// 	 fifthAnim = document.querySelector(".animation-fifthScene");
// 	 addClass(fifthAnim, 'show');
// 	 gameContainer.appendChild(fifthAnim);
//
//
//  	if (prAppend == null) {
//  		prAppend.innerHTML = "";
//  		gameContainer.appendChild(prAppend);
//  	}
//
//     return {
//         text: 'scene5 played',
// 		run: function() {
// 			gameContainer.style.webkitAnimationPlayState = "paused";
// 			gameContainer.style.animation = "colorFlux none 0";
// 			gameContainer.style.backgroundColor = blue;
// 			// addContinue();
// 			var t = [{transitionColor: 'orange'},
// 			{internal: 'Upon arriving to Lighthouse Hill, the Old Man and you can see what appears to be a few fires overhead.'}, {om: 'We need to hurry! That\’s my nephew\’s house!'}, {internal: 'Running up to the scene of the fire you see a crowd of people gathered in front of the house.'}, {om: 'Kids!'}, {internal: 'The Old man runs past you and runs towards toward a group of three children with their mother.'}, {om: 'Alexandria, where\’s Jeremy?' }, {internal: 'You\'ve put yourself a little farther from the Old man and his family, but watch closeby.'}, {internal: 'The Old Man talks to Alexandria, Jeremy\'s wife.'}, {om: 'He went back in to save the mutt?'},
// 			{om: 'He\'s going to kill himself.'}, {internal: 'Barely, thinking, the old man runs toward the burning building only to make it a few feet inside before getting pushed back by the spreading fire.'}, {internal: 'You watch as the old man gets on his knees and starts praying.'}, {internal: 'You have two choices. Attempt to save Jeremy and risk your life or leave and condemn him to die. Saving Jeremy could lead to a faster rescue for your wife depending on his condition when you find him.'},
// 			{prompt: 'Save Jeremy?', choice: {
// 			a: "Yes.",
// 			b: "No.",
// 			resA: [{internal: 'Seeing the pain in Old Man\'s face melted your heart. Here, he was losing a son, or a nephew (the stupid writer can\'t decide.)'}, {internal: 'Seeing this pain made you think of your daughter, Emily.'}, {d: 'I\'m coming for you Emily!'}, {om: 'wait... what?'}, {internal: 'Using all of the force you can muster, you kick some of the burning wood blocking the entry. You go straight for the kitchen and see Jeremy and his dog.'}, {internal: 'You drag Jeremy\'s unconscious body and the dog follows'}, {om: '...you saved him...'}, {internal: 'At this moment there are paramedics taking Jeremy away. And you realize your chance at a ride is gone...'}, {om: 'Please. Take this please.'},
// 			{internal: 'The Old man gives you Jeremy\'s keys.'}, {om: 'I know that my son/nephew would have wanted you to be able to get to your wife.'}, {d: 'I don\'t know what to say.'}, {om: 'Don\'t say nothing. Just fill her back up.'}],
// 			resB: [{internal: 'You turn your back on the family and start to walk away.'}, {internal: 'You start to hear screaming and hear a loud crash as the house collapses on itself'}, {om: 'JEREMY. NO!'}, {internal: 'You don\'t look back. You see a car on the side of the road which has been abandoned aftermath of the first earthquake. When walking up, you see that the keys are still in.'}, {d: 'I\'m coming, Mel.'}]
// 		}}];
// 		click(t);
// 		},
// 		next: sceneEnd
//
//
//     }
// }
//fix: if prompt is up, hidden.onclick should not be active.
var fifthAnim

var fourthAnim

var thirdAnim

var sceneSix = function() {
  //  console.log('Fourth scene logic here');
  if (fifthAnim) {
    fifthAnim.remove()
  }

  if (prAppend == null) {
    prAppend.innerHTML = ''
    gameContainer.appendChild(prAppend)
  }

  return {
    text: 'scene6 played',
    run: function() {
      gameContainer.style.webkitAnimationPlayState = 'paused'
      gameContainer.style.animation = 'fireFlux none 0'
      gameContainer.style.backgroundColor = black
      // addContinue();
      var t = [
        { transitionColor: 'orange' },
        {
          internal:
            'Thanks for playing this preview of Lighthouse Hill. A project for my capstone at Cedarville University.'
        }
      ]
      click(t)
    },
    next: sceneOne
  }
}

var sceneFive = function() {
  console.log('Fourth scene logic here')
  if (fourthAnim) {
    fourthAnim.remove()
  }
  fifthAnim = document.querySelector('.animation-fifthScene')
  addClass(fifthAnim, 'show')
  gameContainer.appendChild(fifthAnim)

  if (prAppend == null) {
    prAppend.innerHTML = ''
    gameContainer.appendChild(prAppend)
  }

  return {
    text: 'scene5 played',
    run: function() {
      gameContainer.style.webkitAnimationPlayState = 'paused'
      gameContainer.style.animation = 'fireFlux none 0'
      gameContainer.style.backgroundColor = blue
      // addContinue();
      var t = [
        { transitionColor: 'orange' },
        {
          internal:
            'You start to drive up the side of the mountain and try calling your wife.'
        },
        { internal: 'click' },
        { m: 'David... where are you?' },
        { d: "I'm driving up right now, Mel. I'll be there in ten." },
        { d: 'I don\t think I have ten minutes. David. There are others here.' },
        { d: "What do you mean 'others'?" },
        { internal: 'In a moment of panic, your wife starts screaming.' },
        { m: "DAVID, THEY'RE TAKING HER!" },
        { internal: 'click' }
      ]
      click(t)
    },
    next: sceneSix
  }
}

var sceneFour = function() {
  console.log('Fourth scene logic here')
  if (thirdAnim) {
    thirdAnim.remove()
  }
  fourthAnim = document.querySelector('.animation-fourthScene')
  addClass(fourthAnim, 'show')
  //  gameContainer.setAttribute('id', 'fireFlux');
  //  addClass(gameContainer, 'fireFlux');
  gameContainer.appendChild(fourthAnim)

  if (prAppend == null) {
    prAppend.innerHTML = ''
    gameContainer.appendChild(prAppend)
  }

  return {
    text: 'scene4 played',
    run: function() {
      gameContainer.style.webkitAnimationPlayState = 'paused'
      gameContainer.style.animation = 'fireFlux 2s both infinite ease-in-out'
      // gameContainer.style.backgroundColor = orange;
      // animation: fireflux 1s both infinite ease-in-out;
      // addContinue();
      var t = [
        { transitionColor: 'orange' },
        {
          internal:
            'Upon arriving to Lighthouse Hill, the Old Man and you can see what appears to be a few fires overhead.'
        },
        { om: 'We need to hurry! That’s my nephew’s house!' },
        {
          internal:
            'Running up to the scene of the fire you see a crowd of people gathered in front of the house.'
        },
        { om: 'Kids!' },
        {
          internal:
            'The Old man runs past you and runs towards toward a group of three children with their mother.'
        },
        { om: 'Alexandria, where’s Jeremy?' },
        {
          internal:
            "You've put yourself a little farther from the Old man and his family, but watch closeby."
        },
        { internal: "The Old Man talks to Alexandria, Jeremy's wife." },
        { om: 'He went back in to save the mutt?' },
        { om: "He's going to kill himself." },
        {
          internal:
            'Barely, thinking, the old man runs toward the burning building only to make it a few feet inside before getting pushed back by the spreading fire.'
        },
        { internal: 'You watch as the old man gets on his knees and starts praying.' },
        {
          internal:
            'You have two choices. Attempt to save Jeremy and risk your life or leave and condemn him to die. Saving Jeremy could lead to a faster rescue for your wife depending on his condition when you find him.'
        },
        {
          prompt: 'Save Jeremy?',
          choice: {
            a: 'Yes.',
            b: 'No.',
            resA: [
              {
                internal:
                  "Seeing the pain in Old Man's face melted your heart. Here, he was losing a son, or a nephew (the stupid writer can't decide.)"
              },
              { internal: 'Seeing this pain made you think of your daughter, Emily.' },
              { d: "I'm coming for you Emily!" },
              { om: 'wait... what?' },
              {
                internal:
                  'Using all of the force you can muster, you kick some of the burning wood blocking the entry. You go straight for the kitchen and see Jeremy and his dog.'
              },
              { internal: "You drag Jeremy's unconscious body and the dog follows" },
              { om: '..you saved him...' },
              {
                internal:
                  'At this moment there are paramedics taking Jeremy away. And you realize your chance at a ride is gone...'
              },
              { om: 'Please. Take this please.' },
              { internal: "The Old man gives you Jeremy's keys." },
              {
                om:
                  'I know that my son/nephew would have wanted you to be able to get to your wife.'
              },
              { d: "I don't know what to say." },
              { om: "Don't say nothing. Just fill her back up." }
            ],
            resB: [
              { internal: 'You turn your back on the family and start to walk away.' },
              {
                internal:
                  'You start to hear screaming and hear a loud crash as the house collapses on itself'
              },
              { om: 'JEREMY. NO!' },
              {
                internal:
                  "You don't look back. You see a car on the side of the road which has been abandoned aftermath of the first earthquake. When walking up, you see that the keys are still in."
              },
              { d: "I'm coming, Mel." }
            ]
          }
        }
      ]
      click(t)
    },
    next: sceneFive
  }
}

var sceneThree = function() {
  console.log('Third scene logic here')
  if (firstAnim) {
    firstAnim.remove()
  }
  thirdAnim = document.querySelector('.animation-thirdScene')
  addClass(thirdAnim, 'show')
  gameContainer.appendChild(thirdAnim)

  if (prAppend == null) {
    prAppend.innerHTML = ''
    gameContainer.appendChild(prAppend)
  }

  return {
    text: 'scene3 played',
    run: function() {
      gameContainer.style.webkitAnimationPlayState = 'paused'
      gameContainer.style.animation = 'colorFlux none 0'
      gameContainer.style.backgroundColor = blue
      // addContinue();
      var t = [
        { transitionColor: 'blue' },
        {
          internal:
            'Upon arriving to the flipped wreckage, David sees the unconscious body of a man upside down stuck by the same belt that was supposed to keep him safe.'
        },
        {
          internal:
            'You open the door and grab the man out of his seat when he starts to wake up.'
        },
        { om: 'Oh thank you! You saved my life.' },
        { internal: 'he says in a raspy voice while coughing up some blood.' },
        { d: 'What happened to you?' },
        { om: "The earthquake. You don't remember the earthquake?" },
        { d: 'Yes, my memory is just a little hazy from everything.' },
        {
          om:
            'Well, we should back to town either way. Usually natural earthquakes have more than one quake.'
        },
        {
          om:
            'Wish my car wasn’t totaled, but that’s only material compared to something else that could have happened.'
        },
        {
          om:
            'Well, we should get to town either way. Usually earthquakes have more than one quake.'
        },
        {
          prompt: 'Go with Old Man?',
          choice: {
            a: 'Yes.',
            b: 'No.',
            resA: [
              { d: 'Sure. I think I need time for my head to clear...' },
              { internal: 'You feel a twinge in your stomach as you remember.' },
              {
                d:
                  'MEL and Emi! My wife and daughter... They are both stuck up the mountain.'
              },
              { d: '...I need to save them!' },
              {
                om:
                  "The mountain? Well, I'll be. There's no way up to the mountain from this area unless you can fly. How'd you even get down?"
              },
              { d: 'I think... I fell.' },
              {
                om:
                  "Well hot Pam, let's get back to the town and I'm sure my nephew Jeremy could help..."
              },
              { internal: 'The old man stops for a second and starts to panick.' },
              { om: 'JEREMY! Oh, no... The town... I have to check on my grandkids!' },
              {
                d:
                  'Let’s hurry, we can probably get there in thirty minutes if you can walk…'
              }
            ],
            resB: [
              {
                d:
                  "I can't. My wife is stuck up the mountain with our baby. They are okay at the moment, but I have to get to them."
              },
              {
                om:
                  "The mountain? Well, I'll be. There's no way up to the mountain from this area unless you can fly. How'd you even get down?"
              },
              { d: 'I think... I fell.' },
              {
                om:
                  "Well, let's get back to the town and I'm sure my nephew Jeremy could help..."
              },
              { internal: 'The old man stops for a second and pauses in fear.' },
              { om: 'JEREMY! No! The town, I have to check on my grandkids!' },
              {
                d:
                  'Let’s hurry, we can probably get there in thirty minutes if you can walk…'
              }
            ]
          }
        }
      ]
      click(t)
    },
    next: sceneFour
  }
}

var sceneTwo = function() {
  homeAnim.remove()

  if (prAppend == null) {
    prAppend.innerHTML = ''
    gameContainer.appendChild(prAppend)
  }
  console.log('Second scene logic here')
  return {
    text: 'scene2 played',
    run: function() {
      // gameContainer.style.webkitAnimationPlayState = "paused";
      // gameContainer.style.animation = "colorFlux none 0";
      // gameContainer.style.backgroundColor = black;

      var t = [
        { transitionColor: null },
        {
          m:
            'I don’t think we should worry about it this moment. You need to get back here fast.'
        },
        { d: 'What’s wrong, Mel?' },
        { m: 'Oh my god. You do have amnesia…, David, the earthquake…' },
        { internal: 'You immediately remember the earthquake.' },
        {
          d:
            'Oh my gosh. The earthquake. I remember, you were driving… I flew out of the windshield…'
        },
        { d: 'Oh my gosh… EMILY!' },
        { m: 'She’s okay. A little banged up, but I just got her to go to sleep.' },
        {
          m:
            'We’re stuck here and need your help getting out. My leg is stuck. Not too bad, I can still feel it and get out, but it would be great if you could get here…'
        },
        {
          internal:
            'You look around and realize that there is no clear way up from where you’re standing.'
        },
        {
          d: 'Just stay still. I’m going to find someone to get me back up the mountain.'
        },
        { m: 'Well… It’s not like I’ll be going anywhere anytime soon.' },
        { d: 'Sorry, poor choice of words' },
        { internal: 'click' },
        { d: 'So now what?' },
        {
          internal:
            'You look around and decide to go deeper into the trees, not too far past you come across a road.'
        },
        {
          internal:
            'On the left you see a sign with the words: "Lighthouse Hill - 2 miles ahead"'
        },
        { d: 'Great, someone there should help me.' },
        {
          internal:
            'As you get closer to the road, you notice a car flipped over with flames starting to appear'
        },
        {
          prompt: 'Check out the car?',
          choice: {
            a: 'Go check it out.',
            b: 'Go into town.',
            resA: [
              {
                d:
                  'Melissa and Emi need me, but they are okay at the moment. If someone is in that car, they probably need me more Mel and Emi at the moment.'
              },
              { om: 'Help! Please... someone please help.' }
            ],
            resB: [
              { d: "I don't have time for this. Melissa and Emi need me." },
              { om: 'Help! Please... someone please help.' },
              { internal: "The pain in the man's cry strikes at David." },
              {
                d:
                  "Mel would've wanted me to save him. She wouldn't forgive me if I purposely ignored him."
              }
            ]
          }
        }
      ]
      // addContinue();
      click(t)
    },
    next: sceneThree
  }
}

var sceneOne = function() {
  homeAnim.remove()

  if (prAppend == null) {
    prAppend.innerHTML = ''
    gameContainer.appendChild(prAppend)
  }
  console.log('First scene logic here')
  return {
    // text: 'scene1 played',
    run: function() {
      gameContainer.style.animation = 'colorFlux none 0'
      gameContainer.style.backgroundColor = red

      var t = [
        { read: ['David...', 'David.', 'David!'], anim: true },
        { transitionColor: 'green' },
        { internal: 'You wake up and notice that around you are small pieces of glass.' },
        {
          internal:
            'Looking up you see yourself surrounded by a field of grass overrun with flowers.'
        },
        { internal: 'You think to yourself: Its pretty peaceful up here.' },
        { u: 'David, can you hear me?' },
        { u: 'David?' },
        { internal: 'That... that’s my name…' },
        { internal: 'You pick up your phone' },
        { d: 'Hello?' },
        { u: 'Oh, David. Thank God. I thought something terrible happened to you.' },
        { d: '… who are you?' },
        { u: 'What are you talking about, David? It’s me… Your wife.' },
        { u: "Is everything all right? What's going on?" },
        {
          prompt: 'Are you okay?',
          choice: {
            a: 'Melissa?',
            b: 'Amnesia.',
            resA: [
              { d: 'Melissa?' },
              { m: 'David! Oh thank God. I thought something bad happend to you.' },
              { d: "I'm not too sure if something didn't." },
              { d: 'My head is feeling a little fuzzy right now.' }
            ],
            resB: [
              { m: "David... It's me your wife... Mel. Melissa." },
              { d: 'Sorry, Mel. Of course, I remember you.' },
              { d: "My head is a little fuzzy, that's all." }
            ]
          }
        }
      ]

      // addContinue();
      click(t)
    },
    next: sceneTwo
  }
}

var game = new Game(sceneOne)
var scene

startButton.onclick = function() {
  scene = game.playScene()
  prAppend.innerHTML = ''
  prContainer.innerHTML = ''
  gameContainer.appendChild(prAppend)

  if (prAppend == undefined) {
    prAppend.style.display = 'none'
  }
  // titleText.innerHTML = scene.text;

  //if on startButton has specific class
  if (hasClass(startButton, 'notStart')) {
    setTimeout(function() {
      hidden.click()
      // alert('force click');
    }, 1000)
  }

  titleText.remove()
  scene.run()

  if (scene.next !== undefined) {
    // gameContainer.appendChild(continueButton);
    game = new Game(scene.next)
  }
}
