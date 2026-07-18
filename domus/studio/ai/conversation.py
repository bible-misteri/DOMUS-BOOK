from dataclasses import dataclass, field

@dataclass
class Conversation:

    messages: list = field(default_factory=list)

    def add(self, role, content):

        self.messages.append({

            "role": role,

            "content": content

        })

    def history(self):

        return self.messages
