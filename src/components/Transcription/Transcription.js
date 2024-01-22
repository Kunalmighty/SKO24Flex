import React, {useState, useEffect} from "react";

import { withTaskContext } from "@twilio/flex-ui";

import { Card } from '@twilio-paste/card';
import {Grid, Column } from '@twilio-paste/core/grid'
import { Heading } from '@twilio-paste/heading';
import { Paragraph } from '@twilio-paste/paragraph';

import {
    ChatBubble,
    ChatLog,
    ChatMessage,
    ChatMessageMeta,
    ChatMessageMetaItem,
    SkeletonLoader,
    Box,
    ChatBookend,
    ChatBookendItem,
    TextArea,
    Label,
    Text,
    Stack,
    Tooltip,
    Avatar,    
} from '@twilio-paste/core'

import { UserIcon } from '@twilio-paste/icons/esm/UserIcon';
import { AgentIcon } from '@twilio-paste/icons/esm/AgentIcon';

import client from '../../utils/sdk-clients/sync/SyncClient'

import AiSuggestion from "./AiSuggestion";

const styles = {
    wrapper : {
        margin: 20
    }
}

const Transcription = (props) => {
    const [loading, setLoading] = useState(true)
    const [transcript, setTranscript] = useState([])
    const [intermediateResult, setIntermediateResult] = useState('')

    const task = props.task


console.log('main props')


    //let stream
    useEffect(() => {
        console.log('in use effect', props.task)
        if (task && task.taskChannelUniqueName === 'voice') {
          // This is a voice task, you can access the CallSid from task attributes
          const callSid = task.attributes.call_sid;
          console.log('Using this CallSid for stream connection:', callSid);
    
          try {
            client.stream('FLEX_ASSIST_' + callSid).then((stream) => {
              setLoading(false);
              console.log('Access to stream:', stream);
              stream.on('messagePublished', (event) => {
                const words = event?.message?.data.text;
                console.log(`Speech server (${event.message.data.track}) >> `, words);
                if (event?.message?.data.isFinal == true) {
                  console.log('Adding to transcript', words);
                  setTranscript((transcript) => [...transcript, { message: words, direction: event.message.data.track }]);
                } else {
                  setIntermediateResult(words);
                }
              });
            });
          } catch (error) {
            console.error('RVS: Unable to subscribe to Sync stream', error);
          }
        } else {
          console.log('Not currently on a voice task.');
        }
      }, []); 
      
      
      if (loading)
      return (
        <Stack orientation={'vertical'} spacing={'space20'}>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </Stack>
      );      

    let layout = (
        <div>
          <Box width={'100%'} overflow="scroll" inset={undefined} padding={'space40'} backgroundColor={'colorBackgroundBody'}>
            <Stack orientation={'vertical'} spacing={'space40'}>
              <>
                <Label htmlFor="caller_text" required>
                  Call (real-time) transcript
                </Label>
                <TextArea
                  onChange={() => {}}
                  id="caller_text"
                  name="caller_text"
                  insertBefore={
                    <Text color="colorTextWeak" as="span" fontWeight="fontWeightSemibold">
                      Caller
                    </Text>
                  }
                  required
                  value={intermediateResult}
                />
              </>

              <AiSuggestion transcript={transcript} />

              <ChatLog>
                {transcript && (
                  <ChatBookend>
                    <ChatBookendItem>
                      <strong>Twilio</strong> real-time voice suggestion
                    </ChatBookendItem>
                  </ChatBookend>
                )}

                {transcript &&
                  transcript.map((item, idx) => {
                    return (
                      <Box
                        key={idx}
                        inset={undefined}
                        gridRow={undefined}
                        gridColumn={undefined}
                        gridAutoFlow={undefined}
                        gridAutoColumns={undefined}
                        gridAutoRows={undefined}
                        gridTemplateColumns={undefined}
                        gridTemplateRows={undefined}
                        gridTemplateAreas={undefined}
                        gridArea={undefined}
                      >
                        <ChatMessage variant={item.direction}>
                          <ChatBubble>{item.message}</ChatBubble>
                          <ChatMessageMeta aria-label={item.direction}>
                            <Tooltip text={item.direction}>
                              <ChatMessageMetaItem>
                                <Avatar
                                  name={item.direction}
                                  size="sizeIcon20"
                                  icon={item.direction == 'inbound' ? UserIcon : AgentIcon}
                                />
                                {item.direction == 'inbound' ? 'Customer' : 'You'}
                              </ChatMessageMetaItem>
                            </Tooltip>
                          </ChatMessageMeta>
                        </ChatMessage>
                      </Box>
                    );
                  })}
              </ChatLog>
            </Stack>
          </Box>



        </div>
    )
    return layout
}
export default withTaskContext(Transcription)