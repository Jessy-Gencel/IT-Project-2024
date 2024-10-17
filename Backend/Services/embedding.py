from transformers import BertTokenizer, BertModel, PreTrainedModel
from transformers.modeling_outputs import BaseModelOutputWithPoolingAndCrossAttentions
import torch
import numpy as np
from sklearn.decomposition import PCA

# Load pre-trained BERT model and tokenizer
def load_bert():
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model = BertModel.from_pretrained("bert-base-uncased")
    return tokenizer, model

def get_word_vector(tokenizer,model:PreTrainedModel,word):
    # Tokenize the input
    inputs = tokenizer(word, return_tensors="pt")
    # Get the hidden states from BERT
    with torch.no_grad():
        outputs : BaseModelOutputWithPoolingAndCrossAttentions = model(**inputs)
    # Return the last hidden state (word embedding)
    return outputs.last_hidden_state.mean(dim=1)





