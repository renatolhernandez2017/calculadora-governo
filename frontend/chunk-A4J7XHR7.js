import{a as L}from"./chunk-HJQLT4TW.js";import{p as O,v as E,x as R}from"./chunk-2SIUNQMU.js";import{r as j,x as y}from"./chunk-6OXDISZQ.js";import{Db as f,Kb as I,Kc as C,Pb as i,Qb as t,Rb as r,Ub as S,Vb as P,Zb as c,_a as l,_b as h,a as T,eb as v,lc as b,ma as d,mb as M,mc as e,na as m,nc as s,rb as _}from"./chunk-6VE4YDTK.js";import"./chunk-CS7K6LXP.js";function w(a,x){a&1&&S(0)}function q(a,x){if(a&1&&_(0,w,1,0,"ng-container",27),a&2){h();let o=b(549);f("ngTemplateOutlet",o)}}function G(a,x){a&1&&S(0)}function N(a,x){if(a&1&&_(0,G,1,0,"ng-container",27),a&2){h();let o=b(551);f("ngTemplateOutlet",o)}}function k(a,x){a&1&&S(0)}function A(a,x){if(a&1&&_(0,k,1,0,"ng-container",27),a&2){h();let o=b(553);f("ngTemplateOutlet",o)}}function F(a,x){}function X(a,x){}function V(a,x){}var Z=(()=>{class a{dispositivoService;router;subscriptions=new T;dispositivo="";constructor(o,p){this.dispositivoService=o,this.router=p}ngOnInit(){this.setSubscriptions()}ngAfterViewInit(){setTimeout(()=>{typeof hljs<"u"&&hljs.highlightAll()},100)}ngOnDestroy(){this.subscriptions.unsubscribe()}verificarDispositivo(o){switch(this.dispositivo=o,o){case E.XSMALL:break;case E.SMALL:break;case E.MEDIUM:break;case E.LARGE:break;case E.XLARGE:break;default:break}}setSubscriptions(){this.subscriptions.add(this.dispositivoService.dispositivo$.subscribe(o=>{this.dispositivo=o,this.verificarDispositivo(o)}))}scrollToSection(o){let p=document.getElementById(o);p&&p.scrollIntoView({behavior:"smooth"})}pythonCode1=`import requests
import json
import os

# Determina caminhos relativos ao script
script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(script_dir)
input_dir = os.path.join(base_dir, 'input')
output_dir = os.path.join(base_dir, 'output')

url = "http://localhost:8080/api/calculadora/regime-geral"

# Carrega dados de entrada
input_file = os.path.join(input_dir, 'entrada-regime-geral.json')
with open(input_file, 'r', encoding='utf-8') as file:
    body = json.load(file)

# Chama API da calculadora
response = requests.post(url, json=body, headers={'Content-Type': 'application/json'})

if response.status_code == 200:
    # Salva resultado do c\xE1lculo
    output_file = os.path.join(output_dir, 'saida-regime-geral.json')
    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(response.json(), file, indent=2, ensure_ascii=False)
    
    print("Calculo de tributos realizado com sucesso!")
    print(f"Status: {response.status_code}")
    print(f"Arquivo gerado: {output_file}")
else:
    print(f"Erro na requisicao: {response.status_code}")
    print(f"Resposta: {response.text}")
    exit(1)`;jsonExample=`{
    "id": "507f1f77bcf86cd799439011",
    "versao": "1.0.0", 
    "dataHoraEmissao": "2027-01-01T03:00:00-03:00",
    "municipio": 4314902,
    "uf": "RS",
    "itens": [
        {
            "numero": 1,
            "ncm": "24021000",
            "quantidade": 222,
            "unidade": "VN", 
            "cst": "550",
            "baseCalculo": 1111,
            "cClassTrib": "550020",
            "tributacaoRegular": {
                "cst": "200",
                "cClassTrib": "200032"
            },
            "impostoSeletivo": {
                "cst": "000",
                "baseCalculo": 1111,
                "cClassTrib": "000001",
                "unidade": "VN",
                "quantidade": 222,
                "impostoInformado": 0
            }
        }
    ]
}`;pythonCode2=`import requests
import json
import os

# Determina caminhos relativos ao script
script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(script_dir)
output_dir = os.path.join(base_dir, 'output')

url = "http://localhost:8080/api/calculadora/xml/generate"

# Carrega resultado do c\xE1lculo anterior
input_file = os.path.join(output_dir, 'saida-regime-geral.json')
with open(input_file, 'r', encoding='utf-8') as file:
    json_data = json.load(file)

# Define o tipo de documento (NFe por padr\xE3o)
params = {
    'tipo': 'NFe'
}

try:
    # Gera XML a partir do c\xE1lculo
    response = requests.post(
        url, 
        json=json_data, 
        params=params,
        headers={
            'Content-Type': 'application/json',
            'Accept': 'application/xml'
        }
    )
    
    if response.status_code == 200:
        # Salva XML gerado
        output_file = os.path.join(output_dir, 'saida-gerar-xml.xml')
        with open(output_file, 'w', encoding='utf-8') as file:
            file.write(response.text)
        print("XML gerado com sucesso!")
        print(f"Arquivo gerado: {output_file}")
    else:
        print(f"Erro na requisicao: {response.status_code}")
        print(f"Resposta: {response.text}")
        exit(1)
        
except requests.exceptions.RequestException as e:
    print(f"Erro de conexao: {e}")
    exit(1)`;pythonCode3=`import requests
import os

# Determina caminhos relativos ao script
script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(script_dir)
output_dir = os.path.join(base_dir, 'output')

url = "http://localhost:8080/api/calculadora/xml/validate"

# Carrega XML gerado anteriormente
input_file = os.path.join(output_dir, 'saida-gerar-xml.xml')
with open(input_file, 'r', encoding='utf-8') as file:
    xml_content = file.read()

# Define tipo e subtipo do documento
params = {
    'tipo': 'nfe',
    'subtipo': 'grupo'
}

try:
    response = requests.post(
        url, 
        data=xml_content, 
        params=params,
        headers={'Content-Type': 'application/xml'}
    )
    
    if response.status_code == 200:
        print("XML valido!")
        print(f"Resposta: {response.text}")
    else:
        print(f"XML invalido: {response.status_code}")
        print(f"Erros: {response.text}")
        exit(1)
        
except requests.exceptions.RequestException as e:
    print(f"Erro de conexao: {e}")
    exit(1)`;pythonCode4=`import xml.etree.ElementTree as ET
import re
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
base_dir = os.path.dirname(script_dir)
input_dir = os.path.join(base_dir, 'input')
output_dir = os.path.join(base_dir, 'output')

def inject_xml_content(source_file, target_file, output_file):
    """
    Injeta o conte\xFAdo RTC no XML da NFe em posi\xE7\xF5es espec\xEDficas usando regex
    """
    
    # Namespace da NFe
    NS = 'http://www.portalfiscal.inf.br/nfe'
    
    # L\xEA os arquivos
    with open(source_file, 'r', encoding='utf-8') as f:
        source_content = f.read()
    
    with open(target_file, 'r', encoding='utf-8') as f:
        target_content = f.read()
    
    # Detecta indenta\xE7\xE3o do XML de destino
    imposto_match = re.search(r'^(\\s*)<imposto>', target_content, re.MULTILINE)
    total_match = re.search(r'^(\\s*)<total>', target_content, re.MULTILINE)
    
    if not imposto_match or not total_match:
        print("ERRO: Nao foi possivel detectar indentacao")
        return False
    
    imposto_indent = len(imposto_match.group(1))
    total_indent = len(total_match.group(1))
    
    # Parse do XML fonte para extrair elementos
    source_root = ET.fromstring(source_content)
    
    # Extrai elementos do XML fonte (com namespace)
    source_det_imposto = source_root.find(f'.//{{{NS}}}det[@nItem="1"]/{{{NS}}}imposto')
    source_total = source_root.find(f'.//{{{NS}}}total')
    
    if not source_det_imposto or not source_total:
        print("ERRO: Elementos fonte nao encontrados")
        return False
    
    # Extrai IS e IBSCBS
    is_element = source_det_imposto.find(f'{{{NS}}}IS')
    ibscbs_element = source_det_imposto.find(f'{{{NS}}}IBSCBS')
    
    # Extrai ISTot e IBSCBSTot
    istot_element = source_total.find(f'{{{NS}}}ISTot')
    ibscbstot_element = source_total.find(f'{{{NS}}}IBSCBSTot')
    
    def element_to_xml_string(element, indent_spaces=10):
        """Converte elemento XML para string preservando estrutura"""
        if element is None:
            return ""
        
        xml_str = ET.tostring(element, encoding='unicode')
        
        # Remove declara\xE7\xF5es de namespace e prefixos
        xml_str = xml_str.replace(f' xmlns="{NS}"', '')
        xml_str = re.sub(r'<ns\\d+:', '<', xml_str)
        xml_str = re.sub(r'</ns\\d+:', '</', xml_str)
        xml_str = re.sub(r' xmlns:ns\\d+="[^"]*"', '', xml_str)
        
        # Formata linha por linha
        from xml.dom import minidom
        
        try:
            dom = minidom.parseString(xml_str)
            pretty = dom.toprettyxml(indent="  ")
            lines = [line for line in pretty.split('\\n') if line.strip() and not line.strip().startswith('<?xml')]
            
            # Adiciona indenta\xE7\xE3o base
            base_indent = ' ' * indent_spaces
            indented = [base_indent + line for line in lines]
            
            return '\\n'.join(indented)
        except:
            lines = xml_str.split('\\n')
            base_indent = ' ' * indent_spaces
            return '\\n'.join([base_indent + line for line in lines if line.strip()])
    
    # Converte elementos para strings
    is_xml = element_to_xml_string(is_element, indent_spaces=imposto_indent + 2)
    ibscbs_xml = element_to_xml_string(ibscbs_element, indent_spaces=imposto_indent + 2)
    istot_xml = element_to_xml_string(istot_element, indent_spaces=total_indent + 2)
    ibscbstot_xml = element_to_xml_string(ibscbstot_element, indent_spaces=total_indent + 2)
    
    # 1. Injeta IS e IBSCBS ao final de <imposto>
    imposto_pattern = r'(\\s*)(</imposto>)'
    
    if is_xml or ibscbs_xml:
        blocks_to_inject = []
        if is_xml:
            blocks_to_inject.append(is_xml)
        if ibscbs_xml:
            blocks_to_inject.append(ibscbs_xml)
        
        replacement = '\\n' + '\\n'.join(blocks_to_inject) + r'\\1\\2'
        target_content = re.sub(imposto_pattern, replacement, target_content, count=1)
    
    # 2. Injeta ISTot e IBSCBSTot ao final de <total>
    total_pattern = r'(\\s*)(<vNFTot>)'
    total_match = re.search(total_pattern, target_content)
    
    if not total_match:
        total_pattern = r'(\\s*)(</total>)'
    
    if istot_xml or ibscbstot_xml:
        blocks_to_inject = []
        if istot_xml:
            blocks_to_inject.append(istot_xml)
        if ibscbstot_xml:
            blocks_to_inject.append(ibscbstot_xml)
        
        replacement = '\\n' + '\\n'.join(blocks_to_inject) + r'\\1\\2'
        target_content = re.sub(total_pattern, replacement, target_content, count=1)
    
    # Salva o arquivo
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(target_content)
    
    return True

# Executa inje\xE7\xE3o
success = inject_xml_content(
    os.path.join(output_dir, 'saida-gerar-xml.xml'),
    os.path.join(input_dir, 'nfe-sem-rtc.xml'),
    os.path.join(output_dir, 'nfe-com-rtc.xml')
)

if success:
    print("\\nXML da RTC injetado na NFe com sucesso!")
else:
    print("\\nFalha ao injetar XML da RTC")
    exit(1)`;bashCommands=`cd integracao-erp/

# 1. Calcular tributos
python3 scripts/1-regime-geral.py

# 2. Gerar XML
python3 scripts/2-gerar-xml.py

# 3. Validar XML (opcional)
python3 scripts/3-validar-grupo-xml.py

# 4. Injetar na NFe
python3 scripts/4-injetar-xml.py`;bashAutomated=`cd integracao-erp/run/

# Linux/Mac
chmod +x executar-exemplo.sh
./executar-exemplo.sh

# Windows
executar-exemplo.bat`;folderStructure=`integracao-erp/
\u251C\u2500\u2500 README.md                    # Documenta\xE7\xE3o completa
\u251C\u2500\u2500 requirements.txt             # Depend\xEAncias Python
\u251C\u2500\u2500 scripts/                     # Scripts Python de integra\xE7\xE3o
\u2502   \u251C\u2500\u2500 1-regime-geral.py       # Calcula tributos RTC
\u2502   \u251C\u2500\u2500 2-gerar-xml.py          # Gera XML com grupos RTC
\u2502   \u251C\u2500\u2500 3-validar-grupo-xml.py  # Valida XML gerado
\u2502   \u2514\u2500\u2500 4-injetar-xml.py        # Injeta RTC na NFe
\u251C\u2500\u2500 input/                       # Arquivos de entrada
\u2502   \u251C\u2500\u2500 entrada-regime-geral.json
\u2502   \u2514\u2500\u2500 nfe-sem-rtc.xml
\u251C\u2500\u2500 output/                      # Arquivos gerados
\u2502   \u251C\u2500\u2500 saida-regime-geral.json
\u2502   \u251C\u2500\u2500 saida-gerar-xml.xml
\u2502   \u2514\u2500\u2500 nfe-com-rtc.xml
\u2514\u2500\u2500 run/                         # Scripts de execu\xE7\xE3o
    \u251C\u2500\u2500 executar-exemplo.sh     # Linux/Mac
    \u2514\u2500\u2500 executar-exemplo.bat    # Windows`;pythonErpAdapter=`# Exemplo: converter dados do ERP para formato RTC
def preparar_entrada_rtc(pedido_erp):
    return {
        "id": pedido_erp.numero,
        "versao": "1.0.0",
        "dataHoraEmissao": pedido_erp.data_emissao.isoformat() + "Z",
        "municipio": pedido_erp.municipio_codigo,
        "uf": pedido_erp.uf,
        "itens": [
            {
                "numero": item.sequencia,
                "ncm": item.ncm,
                "quantidade": item.quantidade,
                "unidade": item.unidade,
                "cst": item.cst,
                "baseCalculo": item.valor_total,
                "cClassTrib": item.classificacao_tributaria,
                # ... outros campos
            } for item in pedido_erp.itens
        ]
    }`;pythonNfeIntegration=`def gerar_nfe_com_rtc(pedido_erp):
    # 1. Preparar dados
    entrada_rtc = preparar_entrada_rtc(pedido_erp)
    
    # 2. Calcular RTC
    roc = calcular_tributos_rtc(entrada_rtc)
    
    # 3. Gerar XML RTC
    xml_rtc = gerar_xml_rtc(roc)
    
    # 4. Gerar NFe base
    nfe_base = gerar_nfe_base(pedido_erp)
    
    # 5. Injetar RTC na NFe
    nfe_final = injetar_rtc_na_nfe(xml_rtc, nfe_base)
    
    return nfe_final`;pythonErrorHandling=`def calcular_com_retry(entrada_rtc, max_tentativas=3):
    for tentativa in range(max_tentativas):
        try:
            response = requests.post(
                "http://localhost:8080/api/calculadora/regime-geral",
                json=entrada_rtc,
                headers={'Content-Type': 'application/json'},
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Erro {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"Tentativa {tentativa + 1} falhou: {e}")
            if tentativa < max_tentativas - 1:
                time.sleep(2 ** tentativa)  # Backoff exponencial
    
    raise Exception("Falha ap\xF3s todas as tentativas")`;static \u0275fac=function(p){return new(p||a)(v(R),v(O))};static \u0275cmp=M({type:a,selectors:[["guia-integracao"]],decls:554,vars:14,consts:[["resultadoGrid4",""],["resultadoGrid8",""],["resultadoGrid12",""],[1,"rtc-grid"],[1,"rtc-grid-item-12"],[3,"titulo","descricao"],[1,"guia-info-box"],[1,"guia-toc"],[3,"click"],["id","estrutura"],[1,"rtc-titulo-forte","rtc-margin-bottom-20"],[1,"guia-highlight-box"],[1,"language-bash"],[1,"guia-flow-list"],[1,"rtc-margin-bottom-20"],["id","fluxo"],["id","passo1"],[1,"rtc-elevacao-1","rtc-padding-10","rtc-margin-bottom-20","guia-step"],[1,"language-python"],[1,"language-json"],["id","passo2"],["id","passo3"],["id","passo4"],["id","execucao"],[1,"guia-file-structure"],["id","adaptacao"],["id","endpoints"],[4,"ngTemplateOutlet"]],template:function(p,n){if(p&1){let u=P();i(0,"div",3)(1,"div",4),r(2,"my-title",5),t()(),i(3,"div",6)(4,"h4"),e(5,"Objetivo"),t(),i(6,"p"),e(7,"Este guia demonstra como integrar um sistema ERP com a "),i(8,"strong"),e(9,"Calculadora da Reforma Tribut\xE1ria do Consumo"),t(),e(10," usando os scripts Python fornecidos no arquivo "),i(11,"code"),e(12,"integracao-erp.zip"),t(),e(13,"."),t()(),i(14,"div",7)(15,"h3"),e(16,"\xCDndice"),t(),i(17,"ul")(18,"li")(19,"a",8),c("click",function(){return d(u),m(n.scrollToSection("estrutura"))}),e(20,"Estrutura de Pastas"),t()(),i(21,"li")(22,"a",8),c("click",function(){return d(u),m(n.scrollToSection("fluxo"))}),e(23,"Fluxo Completo de Integra\xE7\xE3o"),t()(),i(24,"li")(25,"a",8),c("click",function(){return d(u),m(n.scrollToSection("passo1"))}),e(26,"Passo 1: Calcular Tributos da RTC"),t()(),i(27,"li")(28,"a",8),c("click",function(){return d(u),m(n.scrollToSection("passo2"))}),e(29,"Passo 2: Gerar XML dos Grupos de Tributa\xE7\xE3o da RTC"),t()(),i(30,"li")(31,"a",8),c("click",function(){return d(u),m(n.scrollToSection("passo3"))}),e(32,"Passo 3: Validar XML Gerado"),t()(),i(33,"li")(34,"a",8),c("click",function(){return d(u),m(n.scrollToSection("passo4"))}),e(35,"Passo 4: Injetar XML no Documento Fiscal Eletr\xF4nico"),t()(),i(36,"li")(37,"a",8),c("click",function(){return d(u),m(n.scrollToSection("execucao"))}),e(38,"Executando Todo o Fluxo"),t()(),i(39,"li")(40,"a",8),c("click",function(){return d(u),m(n.scrollToSection("adaptacao"))}),e(41,"Adaptando para seu ERP"),t()(),i(42,"li")(43,"a",8),c("click",function(){return d(u),m(n.scrollToSection("endpoints"))}),e(44,"Endpoints da API Utilizados"),t()()()(),i(45,"section",9)(46,"div",10),e(47," Estrutura de Pastas "),t(),i(48,"div",11)(49,"p"),e(50,"Os scripts est\xE3o organizados na pasta "),i(51,"code"),e(52,"integracao-erp/"),t(),e(53," com a seguinte estrutura:"),t()(),i(54,"pre")(55,"code",12),e(56),t()(),i(57,"div",13)(58,"h4"),e(59,"Descri\xE7\xE3o dos diret\xF3rios:"),t(),i(60,"ul")(61,"li")(62,"strong"),e(63,"scripts/"),t(),e(64," - Cont\xE9m os 4 scripts Python"),t(),i(65,"li")(66,"strong"),e(67,"input/"),t(),e(68," - Arquivos de entrada (JSON e XML sem RTC)"),t(),i(69,"li")(70,"strong"),e(71,"output/"),t(),e(72," - Arquivos gerados durante o processo"),t(),i(73,"li")(74,"strong"),e(75,"run/"),t(),e(76," - Scripts shell para execu\xE7\xE3o automatizada"),t()()()(),r(77,"hr",14),i(78,"section",15)(79,"div",10),e(80," Fluxo Completo de Integra\xE7\xE3o "),t(),i(81,"div",13)(82,"p")(83,"strong"),e(84,"O processo de integra\xE7\xE3o segue 4 passos principais:"),t()(),i(85,"ol")(86,"li")(87,"strong"),e(88,"Calcular tributos"),t(),e(89," \u2192 "),i(90,"code"),e(91,"scripts/1-regime-geral.py"),t()(),i(92,"li")(93,"strong"),e(94,"Gerar XML"),t(),e(95," \u2192 "),i(96,"code"),e(97,"scripts/2-gerar-xml.py"),t()(),i(98,"li")(99,"strong"),e(100,"Validar XML"),t(),e(101," \u2192 "),i(102,"code"),e(103,"scripts/3-validar-grupo-xml.py"),t()(),i(104,"li")(105,"strong"),e(106,"Injetar na NFe"),t(),e(107," \u2192 "),i(108,"code"),e(109,"scripts/4-injetar-xml.py"),t()()()()(),r(110,"hr",14),i(111,"section",16)(112,"div",17)(113,"h2"),e(114,"Passo 1: Calcular Tributos da RTC"),t(),i(115,"h3"),e(116,"Script: "),i(117,"code"),e(118,"1-regime-geral.py"),t()(),i(119,"pre")(120,"code",18),e(121),t()(),i(122,"h3"),e(123,"Arquivo de Entrada: "),i(124,"code"),e(125,"entrada-regime-geral.json"),t()(),i(126,"pre")(127,"code",19),e(128),t()(),i(129,"div",11)(130,"h4"),e(131,"O que acontece:"),t(),i(132,"ul")(133,"li"),e(134,"L\xEA o arquivo "),i(135,"code"),e(136,"input/entrada-regime-geral.json"),t(),e(137," com os dados da opera\xE7\xE3o"),t(),i(138,"li"),e(139,"Envia para a API da calculadora em "),i(140,"code"),e(141,"/api/calculadora/regime-geral"),t()(),i(142,"li"),e(143,"Calcula "),i(144,"strong"),e(145,"CBS"),t(),e(146,", "),i(147,"strong"),e(148,"IBS"),t(),e(149," e "),i(150,"strong"),e(151,"IS"),t()(),i(152,"li"),e(153,"Salva o resultado em "),i(154,"code"),e(155,"output/saida-regime-geral.json"),t()(),i(156,"li"),e(157,"Usa caminhos relativos para funcionar de qualquer lugar"),t()()()()(),i(158,"section",20)(159,"div",17)(160,"h2"),e(161,"Passo 2: Gerar XML dos Grupos de Tributa\xE7\xE3o da RTC"),t(),i(162,"h3"),e(163,"Script: "),i(164,"code"),e(165,"2-gerar-xml.py"),t()(),i(166,"pre")(167,"code",18),e(168),t()(),i(169,"div",11)(170,"h4"),e(171,"O que acontece:"),t(),i(172,"ul")(173,"li"),e(174,"L\xEA o resultado do c\xE1lculo de "),i(175,"code"),e(176,"output/saida-regime-geral.json"),t()(),i(177,"li"),e(178,"Converte resultado do c\xE1lculo em "),i(179,"strong"),e(180,"XML estruturado"),t()(),i(181,"li"),e(182,"Endpoint: "),i(183,"code"),e(184,"POST /api/calculadora/xml/generate?tipo=nfe"),t()(),i(185,"li"),e(186,"XML cont\xE9m grupos "),i(187,"code"),e(188,"<IS>"),t(),e(189,", "),i(190,"code"),e(191,"<IBSCBS>"),t(),e(192,", "),i(193,"code"),e(194,"<ISTot>"),t(),e(195,", "),i(196,"code"),e(197,"<IBSCBSTot>"),t()(),i(198,"li"),e(199,"Salva em "),i(200,"code"),e(201,"output/saida-gerar-xml.xml"),t()()()()()(),i(202,"section",21)(203,"div",17)(204,"h2"),e(205,"Passo 3: Validar XML Gerado"),t(),i(206,"h3"),e(207,"Script: "),i(208,"code"),e(209,"3-validar-grupo-xml.py"),t()(),i(210,"pre")(211,"code",18),e(212),t()(),i(213,"div",11)(214,"h4"),e(215,"O que acontece:"),t(),i(216,"ul")(217,"li"),e(218,"L\xEA o XML gerado de "),i(219,"code"),e(220,"output/saida-gerar-xml.xml"),t()(),i(221,"li"),e(222,"Valida se XML est\xE1 "),i(223,"strong"),e(224,"estruturalmente correto"),t()(),i(225,"li"),e(226,"Endpoint: "),i(227,"code"),e(228,"POST /api/calculadora/xml/validate?tipo=nfe&subtipo=grupo"),t()(),i(229,"li"),e(230,"Verifica regras de neg\xF3cio da RTC"),t(),i(231,"li"),e(232,"Retorna mensagem de sucesso ou lista de erros"),t()()()()(),i(233,"section",22)(234,"div",17)(235,"h2"),e(236,"Passo 4: Injetar XML no Documento Fiscal Eletr\xF4nico"),t(),i(237,"h3"),e(238,"Script: "),i(239,"code"),e(240,"4-injetar-xml.py"),t()(),i(241,"pre")(242,"code",18),e(243),t()(),i(244,"div",11)(245,"h4"),e(246,"O que acontece:"),t(),i(247,"ul")(248,"li"),e(249,"L\xEA XML gerado da calculadora de "),i(250,"code"),e(251,"output/saida-gerar-xml.xml"),t()(),i(252,"li"),e(253,"L\xEA NFe sem RTC de "),i(254,"code"),e(255,"input/nfe-sem-rtc.xml"),t()(),i(256,"li")(257,"strong"),e(258,"Extrai"),t(),e(259," grupos de tributa\xE7\xE3o da RTC do XML da Calculadora"),t(),i(260,"li")(261,"strong"),e(262,"Injeta"),t(),e(263," nos locais corretos do Documento Fiscal Eletr\xF4nico: "),i(264,"ul")(265,"li")(266,"code"),e(267,"<IS>"),t(),e(268," e "),i(269,"code"),e(270,"<IBSCBS>"),t(),e(271," dentro de "),i(272,"code"),e(273,"<imposto>"),t(),e(274," do item"),t(),i(275,"li")(276,"code"),e(277,"<ISTot>"),t(),e(278," e "),i(279,"code"),e(280,"<IBSCBSTot>"),t(),e(281," dentro de "),i(282,"code"),e(283,"<total>"),t()()()(),i(284,"li"),e(285,"Detecta automaticamente a indenta\xE7\xE3o do XML de destino"),t(),i(286,"li")(287,"strong"),e(288,"Gera"),t(),e(289," NFe completa em "),i(290,"code"),e(291,"output/nfe-com-rtc.xml"),t()()()()()(),r(292,"hr",14),i(293,"section",23)(294,"div",10),e(295," Executando Todo o Fluxo "),t(),i(296,"h3"),e(297,"Pr\xE9-requisitos"),t(),i(298,"div",11)(299,"ul")(300,"li"),e(301,"Python 3.7 ou superior instalado"),t(),i(302,"li"),e(303,"API da Calculadora RTC rodando em "),i(304,"code"),e(305,"http://localhost:8080"),t()(),i(306,"li"),e(307,"Depend\xEAncias Python instaladas (via "),i(308,"code"),e(309,"pip install -r requirements.txt"),t(),e(310,")"),t()()(),i(311,"h3"),e(312,"M\xE9todo 1: Scripts Individuais"),t(),i(313,"pre")(314,"code",12),e(315),t()(),i(316,"h3"),e(317,"M\xE9todo 2: Script Automatizado (Recomendado)"),t(),i(318,"pre")(319,"code",12),e(320),t()(),i(321,"div",11)(322,"p")(323,"strong"),e(324,"O script automatizado:"),t()(),i(325,"ul")(326,"li"),e(327,"Verifica se Python est\xE1 instalado"),t(),i(328,"li"),e(329,"Instala as depend\xEAnciasse necess\xE1rio"),t(),i(330,"li"),e(331,"Executa os 4 passos em sequ\xEAncia"),t(),i(332,"li"),e(333,"Valida cada etapa antes de prosseguir"),t(),i(334,"li"),e(335,"Exibe mensagens de progresso e resultado final"),t()()(),i(336,"h3"),e(337,"Arquivos Importantes"),t(),i(338,"div",24)(339,"strong"),e(340,"Entrada (pasta "),i(341,"code"),e(342,"input/"),t(),e(343,"):"),t(),i(344,"ul")(345,"li")(346,"code"),e(347,"entrada-regime-geral.json"),t(),e(348," - Dados da opera\xE7\xE3o de consumo"),t(),i(349,"li")(350,"code"),e(351,"nfe-sem-rtc.xml"),t(),e(352," - NFe original sem grupos de tributa\xE7\xE3o da RTC"),t()(),r(353,"br"),i(354,"strong"),e(355,"Sa\xEDda (pasta "),i(356,"code"),e(357,"output/"),t(),e(358,"):"),t(),i(359,"ul")(360,"li")(361,"code"),e(362,"saida-regime-geral.json"),t(),e(363," - Resultado do c\xE1lculo"),t(),i(364,"li")(365,"code"),e(366,"saida-gerar-xml.xml"),t(),e(367," - XML com grupos de tributa\xE7\xE3o da RTC"),t(),i(368,"li")(369,"code"),e(370,"nfe-com-rtc.xml"),t(),e(371," - "),i(372,"strong"),e(373,"NFe final com grupos de tributa\xE7\xE3o da RTC"),t()()()()(),r(374,"hr",14),i(375,"section",25)(376,"div",10),e(377," Adaptando para seu ERP "),t(),i(378,"h3"),e(379,"1. Preparar Dados de Entrada"),t(),i(380,"pre")(381,"code",18),e(382),t()(),i(383,"h3"),e(384,"2. Integrar com Gerador de NFe"),t(),i(385,"pre")(386,"code",18),e(387),t()(),i(388,"h3"),e(389,"3. Tratamento de Erros"),t(),i(390,"pre")(391,"code",18),e(392),t()()(),r(393,"hr",14),i(394,"section",26)(395,"div",10),e(396," Endpoints da API Utilizados "),t(),i(397,"div",13)(398,"h3"),e(399,"C\xE1lculo de Tributos"),t(),i(400,"ul")(401,"li")(402,"strong"),e(403,"Endpoint:"),t(),i(404,"code"),e(405,"POST /api/calculadora/regime-geral"),t()(),i(406,"li")(407,"strong"),e(408,"Content-Type:"),t(),i(409,"code"),e(410,"application/json"),t()(),i(411,"li")(412,"strong"),e(413,"Entrada:"),t(),e(414," JSON com dados da opera\xE7\xE3o"),t(),i(415,"li")(416,"strong"),e(417,"Sa\xEDda:"),t(),e(418," JSON com tributos calculados"),t()(),i(419,"h3"),e(420,"Gera\xE7\xE3o de XML"),t(),i(421,"ul")(422,"li")(423,"strong"),e(424,"Endpoint:"),t(),i(425,"code"),e(426,"POST /api/calculadora/xml/generate"),t()(),i(427,"li")(428,"strong"),e(429,"Par\xE2metros:"),t(),i(430,"code"),e(431,"tipo"),t(),e(432,' (ex: "nfe", "cte")'),t(),i(433,"li")(434,"strong"),e(435,"Content-Type:"),t(),i(436,"code"),e(437,"application/json"),t()(),i(438,"li")(439,"strong"),e(440,"Accept:"),t(),i(441,"code"),e(442,"application/xml"),t()(),i(443,"li")(444,"strong"),e(445,"Entrada:"),t(),e(446," JSON com resultado do c\xE1lculo"),t(),i(447,"li")(448,"strong"),e(449,"Sa\xEDda:"),t(),e(450," XML com grupos de tributa\xE7\xE3o da RTC"),t()(),i(451,"h3"),e(452,"Valida\xE7\xE3o de XML"),t(),i(453,"ul")(454,"li")(455,"strong"),e(456,"Endpoint:"),t(),i(457,"code"),e(458,"POST /api/calculadora/xml/validate"),t()(),i(459,"li")(460,"strong"),e(461,"Par\xE2metros:"),t(),i(462,"code"),e(463,"tipo"),t(),e(464," e "),i(465,"code"),e(466,"subtipo"),t(),e(467,' (ex: tipo="nfe", subtipo="grupo")'),t(),i(468,"li")(469,"strong"),e(470,"Content-Type:"),t(),i(471,"code"),e(472,"application/xml"),t()(),i(473,"li")(474,"strong"),e(475,"Entrada:"),t(),e(476," XML para validar"),t(),i(477,"li")(478,"strong"),e(479,"Sa\xEDda:"),t(),e(480," Resultado da valida\xE7\xE3o"),t()()()(),r(481,"hr",14),i(482,"section")(483,"div",10),e(484," Vantagens desta Abordagem "),t(),i(485,"ul")(486,"li")(487,"strong"),e(488,"Simples"),t(),r(489,"br"),e(490," Apenas 4 scripts Python b\xE1sicos "),t(),i(491,"li")(492,"strong"),e(493,"Reutiliz\xE1vel"),t(),r(494,"br"),e(495," F\xE1cil de adaptar para qualquer ERP "),t(),i(496,"li")(497,"strong"),e(498,"Completa"),t(),r(499,"br"),e(500," Cobre todo ciclo de integra\xE7\xE3o "),t(),i(501,"li")(502,"strong"),e(503,"Testada"),t(),r(504,"br"),e(505," Scripts funcionais e validados "),t(),i(506,"li")(507,"strong"),e(508,"Padr\xE3o"),t(),r(509,"br"),e(510," Gera NFe compat\xEDvel com RTC "),t()()(),r(511,"hr",14),i(512,"section")(513,"div",10),e(514," Pr\xF3ximos Passos "),t(),i(515,"div",13)(516,"ol")(517,"li")(518,"strong"),e(519,"Testar"),t(),e(520," os scripts com seus dados"),t(),i(521,"li")(522,"strong"),e(523,"Adaptar"),t(),e(524," para estrutura do seu ERP"),t(),i(525,"li")(526,"strong"),e(527,"Integrar"),t(),e(528," no fluxo de emiss\xE3o de NFe"),t(),i(529,"li")(530,"strong"),e(531,"Validar"),t(),e(532," NFe completa no ambiente de homologa\xE7\xE3o"),t(),i(533,"li")(534,"strong"),e(535,"Implementar"),t(),e(536," em produ\xE7\xE3o"),t()()(),i(537,"div",6)(538,"h4"),e(539,"Conclus\xE3o"),t(),i(540,"p"),e(541,"Com estes scripts voc\xEA tem uma base s\xF3lida para integrar qualquer ERP com a "),i(542,"strong"),e(543,"Calculadora da Reforma Tribut\xE1ria do Consumo!"),t()()()(),i(544,"div"),_(545,q,1,1,"ng-container")(546,N,1,1,"ng-container")(547,A,1,1,"ng-container"),t(),_(548,F,0,0,"ng-template",null,0,C)(550,X,0,0,"ng-template",null,1,C)(552,V,0,0,"ng-template",null,2,C)}p&2&&(l(2),f("titulo","Guia de Integra\xE7\xE3o da Calculadora com sistemas ERP")("descricao","Guia pr\xE1tico para integra\xE7\xE3o de sistemas ERP com a Calculadora da Reforma Tribut\xE1ria do Consumo usando Python."),l(54),s(n.folderStructure),l(65),s(n.pythonCode1),l(7),s(n.jsonExample),l(40),s(n.pythonCode2),l(44),s(n.pythonCode3),l(31),s(n.pythonCode4),l(72),s(n.bashCommands),l(5),s(n.bashAutomated),l(62),s(n.pythonErpAdapter),l(5),s(n.pythonNfeIntegration),l(5),s(n.pythonErrorHandling),l(153),I(n.dispositivo=="device-xsmall"?545:n.dispositivo=="device-small"||n.dispositivo=="device-medium"?546:547))},dependencies:[y,j,L],styles:[`h1[_ngcontent-%COMP%]{color:#2c3e50;margin-bottom:20px}h2[_ngcontent-%COMP%]{color:#34495e;border-bottom:2px solid #ecf0f1;padding-bottom:10px}h3[_ngcontent-%COMP%]{color:#2c3e50}h4[_ngcontent-%COMP%]{color:#3498db}pre[_ngcontent-%COMP%]{background-color:#fafafa;padding:20px;border:1px solid #e8e8e8;overflow-x:auto;border-radius:6px;margin:20px 0;font-family:Consolas,Monaco,Courier New,monospace;font-size:14px;line-height:1.5;color:#555}code[_ngcontent-%COMP%]{background:#f1f3f4;padding:2px 6px;border-radius:3px;font-family:Consolas,Monaco,Courier New,monospace;font-size:.9em;color:#d73a49}pre[_ngcontent-%COMP%]   code[_ngcontent-%COMP%]{background:transparent;padding:0;color:inherit}ul[_ngcontent-%COMP%]{list-style-type:disc;padding-left:20px}ol[_ngcontent-%COMP%]{padding-left:30px}li[_ngcontent-%COMP%]{margin:8px 0}.guia-step[_ngcontent-%COMP%]{margin:20px 0}.guia-step[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-top:0;color:#3498db}.guia-highlight-box[_ngcontent-%COMP%]{background:#fff;border:1px solid #e8e8e8;border-radius:6px;padding:20px;margin:20px 0}.guia-highlight-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:0;color:#2c3e50}.guia-warning-box[_ngcontent-%COMP%]{background:#fff;border:1px solid #e8e8e8;border-left:3px solid #ffc107;border-radius:6px;padding:20px;margin:20px 0}.guia-info-box[_ngcontent-%COMP%]{background:#fff;border:1px solid #e8e8e8;border-radius:6px;padding:20px;margin:20px 0}.guia-info-box[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin-top:0;color:#2c3e50}.guia-file-structure[_ngcontent-%COMP%]{background:#fafafa;border:1px solid #e8e8e8;border-radius:6px;padding:20px;font-family:Consolas,Monaco,Courier New,monospace;margin:20px 0;white-space:pre-line;color:#555}.guia-advantages[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin:30px 0}.guia-advantage-item[_ngcontent-%COMP%]{background:#fff;padding:20px;border-radius:8px;border:1px solid #e8e8e8;color:#333;transition:all .2s ease}.guia-advantage-item[_ngcontent-%COMP%]:hover{border-color:#d0d0d0;transform:translateY(-1px);box-shadow:0 2px 8px #00000014}.guia-toc[_ngcontent-%COMP%]{background:#fff;padding:25px;border-radius:8px;margin:25px 0;border:1px solid #e8e8e8}.guia-toc[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;padding-left:0}.guia-toc[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:8px 0;padding-left:20px}.guia-toc[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#007bff;cursor:pointer}.guia-toc[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline;color:#0056b3}.guia-flow-list[_ngcontent-%COMP%]{background:#f8f9fa;color:#333;padding:25px;border-radius:8px;margin:25px 0;border:1px solid #e8e8e8}.guia-flow-list[_ngcontent-%COMP%]   ol[_ngcontent-%COMP%]{margin:0;padding-left:30px}.guia-flow-list[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:10px 0;font-weight:500}@media (max-width: 768px){pre[_ngcontent-%COMP%]{font-size:12px}.guia-advantages[_ngcontent-%COMP%]{grid-template-columns:1fr}}
/*# sourceMappingURL=guia-integracao.component-CHRYM256.css.map */`]})}return a})();export{Z as GuiaIntegracaoComponent};
//# sourceMappingURL=chunk-A4J7XHR7.js.map
