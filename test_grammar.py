from grammar_checker import check_grammar

email = """
dear manager,

i am not feeling well so i cant come office tomorrow.

thanks,
shivam
"""

result = check_grammar(email)

print(result)