PennController.ResetPrefix(null) // keep this line here

PennController.DebugOff() 

PennController.PreloadZip("https://www.ling.upenn.edu/~weilai/Soundfiles/Stimuli.zip")

Sequence(
    "consentform",
    "playfile", 
    "instructions",
    randomize("Practice"),
    "start",
    randomize("training1"),
    "break",
    randomize("training2"),
    "break",
    randomize("testing"),
    "dem",
    "send",
    "final"
)

// consentform
PennController( "consentform" ,
    newHtml("consentform", "consentform_v2.html")
        .center()
        .print()
    ,
    newCanvas("consent_buttons", 600, 80)
        .add(100, 20, 
            newButton("consent_yes", "I give consent.")
                .css("font-size", "1em")
                .css("padding", "10px 20px")
            )
        .add(320, 20, 
            newButton("consent_no", "I do not give consent.")
                .css("font-size", "1em")
                .css("padding", "10px 20px")
            )
        .center()
        .print()
    ,
    getButton("consent_no")
        .callback(
            clear()
            ,
            newText("no_consent_message",
                "You have indicated that you do not wish to give consent. The study will now end. You may close this window."
            )
                .css("font-size", "1.2em")
                .css("margin", "40px auto")
                .css("max-width", "800px")
                .print()
        )
    ,
    getButton("consent_yes")
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )
.setOption("hideProgressBar", true)

// Check that participants are able to play a "test" audio file    
PennController( "playfile" ,
    newHtml("playfile.html")
      .print()
      .center()
    ,
    newButton("I am able to play the file.")
        .css("font-size", "1em")
        .css("padding", "10px 20px")
        .print()
        .center()
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )     
.setOption("hideProgressBar", true)  


// Give instructions
PennController( "instructions" ,
    newHtml("instructionsCat.html")
      .print()
      .center()
    ,
    newButton("I have read the instructions.")
        .css("font-size", "1em")
        .css("padding", "10px 20px")
        .print()
        .center()
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )     
.setOption("hideProgressBar", true) 

// Give instructions
PennController( "start" ,
    newHtml("startCat.html")
      .print()
      .center()
    ,
    newButton("start")
        .css("font-size", "1em")
        .print()
        .center()
        .wait()
)
.log( "ID" , PennController.GetURLParameter("id") )     
.setOption("hideProgressBar", true) 

// forced-choice task
//Training phase 1
PennController. Template("MaleSbiased.csv", row=>
newTrial("training1",
    newText("question", "Which word have you heard?")
      .center()
      .css("font-size", "1em")
      .bold()
      .print()
      .log()
    ,
    
    newAudio("audio", row.soundfile)
      .log("play", "end")
      //.print()
      .play()
      .once()
      //.disable()
    ,
    
    newButton("correct", row.correct)
      .css("font-size", "1em")
      .log()
    ,
    newButton("foil", row.foil)
      .css("font-size", "1em")
      .log()
    ,
    newCanvas("choice", "100vw", "70vh")
      .add( "35vw", "15vh",  getButton("correct"))
      .add( "60vw", "15vh", getButton("foil"))
      .print()
      .log()
    ,
    newVar("selection").global()
    ,
    newSelector("select")
      .add(getButton("correct"), getButton("foil"))
      .shuffle()
      .print()
      .log()
      .wait()
      .test.selected(getButton("correct")).success( getVar("selection").set("correct") )
      .test.selected(getButton("foil")).success( getVar("selection").set("foil") )
    )
    .log("stimuli", row.soundfile)
    .log("condition", row.condition)
    .log("correct", row.correct)
    .log("foil", row.foil)
    .log("perceived", getVar("selection"))
    )
    
//Training phase 2
PennController. Template("FemaleSbiased.csv", row=>
newTrial("training2",
    newText("question", "Which word have you heard?")
      .center()
      .css("font-size", "1em")
      .bold()
      .print()
      .log()
    ,
    
    newAudio("audio", row.soundfile)
      .log("play", "end")
      //.print()
      .play()
      .once()
      //.disable()
    ,
    
    newButton("correct", row.correct)
      .css("font-size", "1em")
      .log()
    ,
    newButton("foil", row.foil)
      .css("font-size", "1em")
      .log()
    ,
    newCanvas("choice", "100vw", "70vh")
      .add( "35vw", "15vh",  getButton("correct"))
      .add( "60vw", "15vh", getButton("foil"))
      .print()
      .log()
    ,
    newVar("selection").global()
    ,
    newSelector("select")
      .add(getButton("correct"), getButton("foil"))
      .shuffle()
      .print()
      .log()
      .wait()
      .test.selected(getButton("correct")).success( getVar("selection").set("correct") )
      .test.selected(getButton("foil")).success( getVar("selection").set("foil") )
    )
    .log("stimuli", row.soundfile)
    .log("condition", row.condition)
    .log("correct", row.correct)
    .log("foil", row.foil)
    .log("perceived", getVar("selection"))
    )
    
// This creates a trial labeled "break"; 
PennController( "break" ,
      newText("You may now take a short break.")
        .center()
        .bold()
        .css("margin-bottom", "40px")
        .print()
      ,
      newButton("break finished")
        .css("font-size", "1em")
        .center()
        .print()
        .wait()
)    
    
PennController. Template("Practice.csv", row=>
newTrial("Practice",
    newText("question", "Which word have you heard?")
      .center()
      .css("font-size", "1em")
      .bold()
      .print()
      .log()
    ,
    
    newAudio("audio", row.soundfile)
      .log("play", "end")
      //.print()
      .play()
      .once()
      //.disable()
    ,
    
    newButton("correct", row.correct)
      .css("font-size", "1em")
      .log()
    ,
    newButton("foil", row.foil)
      .css("font-size", "1em")
      .log()
    ,
    newCanvas("choice", "100vw", "70vh")
      .add( "35vw", "15vh",  getButton("correct") )
      .add( "60vw", "15vh", getButton("foil") )
      .print()
      .log()
    ,
    newVar("selection").global()
    ,
    newSelector("select")
      .add(getButton("correct"), getButton("foil"))
      .shuffle()
      .print()
      .log()
      .wait()
      .test.selected(getButton("correct")).success( getVar("selection").set("correct") )
      .test.selected(getButton("foil")).success( getVar("selection").set("foil") )
    )
    .log("stimuli", row.soundfile)
    .log("condition", row.condition)
    .log("correct", row.correct)
    .log("foil", row.foil)
    .log("perceived", getVar("selection"))
    )
    
//Testing phase
PennController. Template("FemaleTest.csv", row=>
newTrial("testing",
    newText("question", "Which word have you heard?")
      .center()
      .css("font-size", "1em")
      .bold()
      .print()
      .log()
    ,
    
    newAudio("audio", row.soundfile)
      .log("play", "end")
      //.print()
      .play()
      .once()
      //.disable()
    ,
    
    newButton("s", row.s)
      .css("font-size", "1em")
      .log()
    ,
    newButton("sh", row.sh)
      .css("font-size", "1em")
      .log()
    ,
    newCanvas("choice", "100vw", "70vh")
      .add( "35vw", "15vh",  getButton("s") )
      .add( "60vw", "15vh", getButton("sh") )
      .print()
      .log()
    ,
    newVar("selection").global()
    ,
    newSelector("select")
      .add(getButton("s"), getButton("sh"))
      .shuffle()
      .print()
      .log()
      .wait()
      .test.selected(getButton("s")).success( getVar("selection").set("s") )
      .test.selected(getButton("sh")).success( getVar("selection").set("sh") )
    )
    .log("stimuli", row.soundfile)
    .log("condition", row.condition)
    .log("s", row.s)
    .log("sh", row.sh)
    .log("perceived", getVar("selection"))
    )

PennController("dem",
    defaultText
        .print()
    ,

    newText("<p>Thanks for your participation! Please give us these last pieces of information before we save your answers.</p>")
    ,

    newText("age_question", "<p>What is your age?</p>")
    ,

    newTextInput("Age")
        .css("width", "80px")
        .print()
        .log()
    ,

    newText("age_warning", "Please enter your age as a number between 18 and 100.")
        .color("red")
    ,

    newDropDown("Gender", "What gender do you identify as?")
        .add("woman", "man", "non-binary", "other", "prefer not to say")
        .print()
        .log()
        .wait()
    ,

    newDropDown("Race", "Which race/ethnicity do you most identify with?")
        .add("Asian", "Black/African", "Caucasian/White", "Hispanic/Latinx",
             "Native American", "Pacific Island", "Mixed Race", "Other",
             "Prefer not to answer")
        .print()
        .log()
        .wait()
    ,

    newDropDown("Language", "Do you speak any languages other than English like a native speaker?")
        .add("yes", "no")
        .print()
        .log()
        .wait()
    ,

    newDropDown("VoiceNumber", "How many voices did you hear in this experiment?")
        .add("1", "2", "3", "4+")
        .print()
        .log()
        .wait()
    ,

    newDropDown("VoiceGender", "What is/are the gender(s) of the speaker(s) that you heard?")
        .add("female speakers only", "male speakers only", "both female and male speakers")
        .print()
        .log()
        .wait()
    ,

    newDropDown("Distraction", "Were you distracted during this experiment?")
        .add("Yes", "No")
        .print()
        .log()
        .wait()
    ,

    newButton("send results")
        .print()
        .wait(
            getTextInput("Age")
                .test.text(/^(1[8-9]|[2-9][0-9]|100)$/)
                .failure(getText("age_warning").print())
        )
)
.log("workerId", PennController.GetURLParameter("workerId"))
.log("assignmentId", PennController.GetURLParameter("assignmentId"))
.log("hitId", PennController.GetURLParameter("hitId"))

PennController.SendResults("send")

PennController("final",
    newHtml("debriefing", "debriefing.html")
        .center()
        .print()
    ,

    newText("<p><strong>Please click the button below to submit your completed HIT and receive payment.</strong></p>")
        .center()
        .print()
    ,

    newButton("Submit HIT")
        .center()
        .print()
        .wait()
    ,

    newFunction("submitToMTurk", () => {
        const params = new URLSearchParams(window.location.search);
        const assignmentId = params.get("assignmentId");
        const turkSubmitTo = params.get("turkSubmitTo");

        if (!assignmentId || !turkSubmitTo ||
            assignmentId === "ASSIGNMENT_ID_NOT_AVAILABLE") {
            alert("Please accept the HIT on MTurk before completing the study.");
            return;
        }

        const form = document.createElement("form");
        form.method = "post";
        form.action = new URL("mturk/externalSubmit", turkSubmitTo).href;

        const assignmentField = document.createElement("input");
        assignmentField.type = "hidden";
        assignmentField.name = "assignmentId";
        assignmentField.value = assignmentId;
        form.appendChild(assignmentField);

        const completionField = document.createElement("input");
        completionField.type = "hidden";
        completionField.name = "completion";
        completionField.value = "complete";
        form.appendChild(completionField);

        document.body.appendChild(form);
        form.submit();
    }).call()
)