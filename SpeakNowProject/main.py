import pandas as pd
import matplotlib.pyplot as plt

# Load the CSV files into DataFrames
vocab = pd.read_csv("vocab_data.csv")
num_words = pd.read_csv("num_words.csv")

# Print the first 5 rows of each file for preview
print("vocab_data.csv:")
print(vocab.head().to_string(index=False))
print("\nnum_words.csv:")
print(num_words.head().to_string(index=False))

# Check for missing values in both files
print("\nCheck for missing values:")
print("\nNull values in vocab_data:")
print(vocab.isnull().sum())
print("\nNull values in num_words:")
print(num_words.isnull().sum())

# Check for duplicate rows
print("\nCheck for duplicates:")
print("\nDuplicated rows in vocab_data:", vocab.duplicated().sum())
print("\nDuplicated rows in num_words:", num_words.duplicated().sum())

# Print data types to ensure everything looks correct
print("\nCheck data types:")
print("\nvocab_data types:")
print(vocab.dtypes)
print("\nnum_words types:")
print(num_words.dtypes)

# Normalize the vocabulary columns so each row sums to 1
normal = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2']
sum_row = vocab[normal].sum(axis=1)
vocab[normal] = vocab[normal].div(sum_row, axis=0)

# Check that normalization worked (each row should sum to ~1.0)
print("\nRow sums after normalization:")
print(vocab[normal].sum(axis=1).head())

# Preview the normalized DataFrame
print("\nNormalized table:")
print(vocab.head())

# Add new column "high_level" which is the sum of C1 and C2
vocab["high_level"] = (vocab["c1"] + vocab["c2"]).round(6)

# Check the new column
print("\nHigh level column (C1 + C2):")
print(vocab[["c1", "c2", "high_level"]].head().to_string(index=False))

# Merge the two datasets on "assessment_id"
combined = pd.merge(vocab, num_words, on="assessment_id")

# Save the merged data to a new CSV file
combined.to_csv("combined.csv", index=False)

# Preview the merged data
print("\nCombined dataset:")
print(combined.head().to_string(index=False))

# Calculate the mean of each relevant column
columns_to_plot = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2', 'high_level', 'number_of_words']
means = combined[columns_to_plot].mean()

# Create a bar chart of the means
plt.figure(figsize=(10, 6))
means.plot(kind='bar')
plt.title("Mean of Vocabulary Levels and Word Count")
plt.ylabel("Mean Value")
plt.xticks(rotation=0)
plt.tight_layout()

# Save the plot to a file
plt.savefig("bar.png")


